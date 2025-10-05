import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  UserMessagePart,
  AssistantMessagePart,
  RunAssistantHtmlParams,
} from '../interfaces/assistant-message.interface';
import {
  OpenAIUserPartType,
  OpenAIAssistantPartType,
} from '../enums/assistant-message.enum';
import { OpenAIModel } from '../enums/openai-model.enum';
import {
  OPENAI_BETA_HEADER,
  OPENAI_THREADS_PATH,
  OPENAI_MESSAGES_SEGMENT,
  OPENAI_RUNS_SEGMENT,
  OPENAI_MESSAGES_ORDER,
  OPENAI_MESSAGES_LIMIT,
  OPENAI_RUN_POLL_TIMEOUT_MS,
  OPENAI_RUN_POLL_INTERVAL_MS,
  OPENAI_RUN_STATUS_COMPLETED,
  OPENAI_RUN_STATUS_FAILED,
  OPENAI_RUN_STATUS_CANCELLED,
  OPENAI_RUN_STATUS_EXPIRED,
} from '../constants/openai.constants';

@Injectable()
export class OpenAIIntegration {
  constructor(private readonly config: ConfigService) {}

  private get apiKey(): string {
    const key = this.config.get<string>('OPENAI_API_KEY', '');
    if (!key)
      throw new InternalServerErrorException('OPENAI_API_KEY is missing.');
    return key;
  }

  private get baseUrl(): string {
    return this.config.get<string>(
      'OPENAI_BASE_URL',
      'https://api.openai.com/v1',
    );
  }

  private get model(): OpenAIModel {
    return this.config.get<OpenAIModel>('OPENAI_MODEL') ?? OpenAIModel.GPT_4O;
  }

  private get assistantId(): string {
    const id = this.config.get<string>('OPENAI_ASSISTANT_ID', '');
    if (!id)
      throw new InternalServerErrorException('OPENAI_ASSISTANT_ID is missing.');
    return id;
  }

  /**
   * Headers for Assistants v2
   */
  private get assistantHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': OPENAI_BETA_HEADER,
    };
  }

  /**
   * Creates a new thread for conversation
   */
  async createThread(): Promise<string> {
    const res = await fetch(`${this.baseUrl}${OPENAI_THREADS_PATH}`, {
      method: 'POST',
      headers: this.assistantHeaders,
      body: JSON.stringify({}),
    });

    if (!res.ok)
      throw new InternalServerErrorException(
        `OpenAI createThread error ${res.status}: ${await res.text()}`,
      );
    const json = await res.json();
    return json.id as string;
  }

  /**
   * Adds user message with text and images via URLs.
   * Maintains compatibility with public WMS PNG URLs (not base64).
   */
  async addUserMessageWithImages(
    threadId: string,
    userText: string,
    imageUrls: string[],
  ): Promise<unknown> {
    const content: UserMessagePart[] = [
      { type: OpenAIUserPartType.TEXT, text: userText },
      ...imageUrls.map(
        (url): UserMessagePart => ({
          type: OpenAIUserPartType.IMAGE_URL,
          image_url: { url },
        }),
      ),
    ];

    const res = await fetch(
      `${this.baseUrl}${OPENAI_THREADS_PATH}/${threadId}${OPENAI_MESSAGES_SEGMENT}`,
      {
        method: 'POST',
        headers: this.assistantHeaders,
        body: JSON.stringify({
          role: 'user',
          content,
        }),
      },
    );

    if (!res.ok)
      throw new InternalServerErrorException(
        `OpenAI addMessage error ${res.status}: ${await res.text()}`,
      );
    return res.json();
  }

  /**
   * Runs the assistant on a thread.
   * max_output_tokens removed (not supported by Assistants v2).
   */
  async runAssistant(
    threadId: string,
    temperature = 0.2,
  ): Promise<{ id: string }> {
    const res = await fetch(
      `${this.baseUrl}${OPENAI_THREADS_PATH}/${threadId}${OPENAI_RUNS_SEGMENT}`,
      {
        method: 'POST',
        headers: this.assistantHeaders,
        body: JSON.stringify({
          assistant_id: this.assistantId,
          model: this.model,
          temperature,
        }),
      },
    );

    if (!res.ok)
      throw new InternalServerErrorException(
        `OpenAI run error ${res.status}: ${await res.text()}`,
      );
    return res.json();
  }

  /**
   * Polls run status until completion or failure
   */
  async pollRun(
    threadId: string,
    runId: string,
    timeoutMs = OPENAI_RUN_POLL_TIMEOUT_MS,
    intervalMs = OPENAI_RUN_POLL_INTERVAL_MS,
  ): Promise<unknown> {
    const start = Date.now();

    while (true) {
      const res = await fetch(
        `${this.baseUrl}${OPENAI_THREADS_PATH}/${threadId}${OPENAI_RUNS_SEGMENT}/${runId}`,
        {
          method: 'GET',
          headers: this.assistantHeaders,
        },
      );

      if (!res.ok)
        throw new InternalServerErrorException(
          `OpenAI poll run error ${res.status}: ${await res.text()}`,
        );
      const json = await res.json();

      const status = json.status as string;
      if (status === OPENAI_RUN_STATUS_COMPLETED) return json;
      if (
        status === OPENAI_RUN_STATUS_FAILED ||
        status === OPENAI_RUN_STATUS_CANCELLED ||
        status === OPENAI_RUN_STATUS_EXPIRED
      ) {
        throw new InternalServerErrorException(
          `Assistant run ended with status=${status}`,
        );
      }
      if (Date.now() - start > timeoutMs) {
        throw new InternalServerErrorException(
          `Assistant run timeout after ${timeoutMs} ms`,
        );
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }
  }

  /**
   * Lists thread messages
   */
  async listMessages(threadId: string): Promise<unknown> {
    const res = await fetch(
      `${this.baseUrl}${OPENAI_THREADS_PATH}/${threadId}${OPENAI_MESSAGES_SEGMENT}?order=${OPENAI_MESSAGES_ORDER}&limit=${OPENAI_MESSAGES_LIMIT}`,
      {
        method: 'GET',
        headers: this.assistantHeaders,
      },
    );

    if (!res.ok)
      throw new InternalServerErrorException(
        `OpenAI list messages error ${res.status}: ${await res.text()}`,
      );
    return res.json();
  }

  /**
   * Extracts HTML from assistant response, removing code fences if present
   */
  private extractHtmlFromAssistant(messagesListJson: any): string {
    const msg = (messagesListJson?.data ?? []).find(
      (m: any) => m.role === 'assistant',
    );
    if (!msg)
      throw new InternalServerErrorException('Assistant returned no message.');

    const parts = (msg.content ?? []) as AssistantMessagePart[];
    const htmlChunks: string[] = [];

    for (const p of parts) {
      if (
        p.type === OpenAIAssistantPartType.TEXT &&
        typeof p.text?.value === 'string'
      ) {
        htmlChunks.push(p.text.value);
      }
    }

    let html = htmlChunks.join('\n').trim();
    if (!html)
      throw new InternalServerErrorException('Assistant returned empty HTML.');

    // Remove HTML code fences if present
    html = html
      .replace(/```html\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();

    return html;
  }

  /**
   * Orchestrates: creates thread, adds message with text + images (URLs), runs assistant and returns HTML.
   * Sends images as image_url parts with public WMS URLs; v2 requires OpenAI-Beta header.
   */
  async runAssistantHtml(params: RunAssistantHtmlParams): Promise<string> {
    const { userText, imageUrls, temperature = 0.2 } = params;

    const threadId = await this.createThread();
    await this.addUserMessageWithImages(
      threadId,
      userText,
      Array.isArray(imageUrls) ? imageUrls : [imageUrls[0], imageUrls[1]],
    );

    const run = await this.runAssistant(threadId, temperature);
    await this.pollRun(threadId, run.id);

    const messages = await this.listMessages(threadId);
    const html = this.extractHtmlFromAssistant(messages);
    return html;
  }
}
