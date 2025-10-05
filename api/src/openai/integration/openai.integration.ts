import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Partes de MENSAGEM DO USUÁRIO (envio para o thread)
type UserMessagePart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }
  // opcional: se um dia fizer upload de arquivo em vez de URL
  | { type: 'image_file'; image_file: { file_id: string } };

// Partes de MENSAGEM DO ASSISTENTE (leitura da resposta)
type AssistantMessagePart =
  | { type: 'text'; text: { value: string } }
  | { type: 'image_url'; image_url: { url: string } }
  | { type: 'image_file'; image_file: { file_id: string } };


@Injectable()
export class OpenAIIntegration {
  constructor(private readonly config: ConfigService) {}

  private get apiKey(): string {
    const key = this.config.get<string>('OPENAI_API_KEY', '');
    if (!key) throw new InternalServerErrorException('OPENAI_API_KEY is missing.');
    return key;
  }

  private get baseUrl(): string {
    return this.config.get<string>('OPENAI_BASE_URL', 'https://api.openai.com/v1');
  }

  private get model(): string {
    return this.config.get<string>('OPENAI_MODEL') ?? 'gpt-4o';
  }

  private get assistantId(): string {
    const id = this.config.get<string>('OPENAI_ASSISTANT_ID', '');
    if (!id) throw new InternalServerErrorException('OPENAI_ASSISTANT_ID is missing.');
    return id;
  }

  // --------------------
  // Assistants (Threads/Runs)
  // --------------------

  private async createThread(): Promise<string> {
        const res = await fetch(`${this.baseUrl}/threads`, {
    method: 'POST',
    headers: this.assistantHeaders,
    body: JSON.stringify({}),
    });

    if (!res.ok) throw new InternalServerErrorException(`OpenAI createThread error ${res.status}: ${await res.text()}`);
    const json = await res.json();
    return json.id as string;
  }

  private async addUserMessageWithImages(threadId: string, userText: string, imageUrls: string[]) {
    const content: UserMessagePart[] = [
        { type: 'text', text: userText },
        ...imageUrls.map((url): UserMessagePart => ({
        type: 'image_url',
        image_url: { url },
        })),
    ];

    const res = await fetch(`${this.baseUrl}/threads/${threadId}/messages`, {
        method: 'POST',
        headers: this.assistantHeaders,
        body: JSON.stringify({
        role: 'user',
        content,
        }),
    });
    if (!res.ok) throw new InternalServerErrorException(`OpenAI addMessage error ${res.status}: ${await res.text()}`);
    return res.json();
    }


  private async runAssistant(threadId: string, temperature = 0.2) {
    const res = await fetch(`${this.baseUrl}/threads/${threadId}/runs`, {
        method: 'POST',
        headers: this.assistantHeaders,
        body: JSON.stringify({
        assistant_id: this.assistantId,
        model: this.model,
        // temperature pode ou não ser aceito dependendo do modelo/rollout.
        // Se der erro "Unknown parameter: 'temperature'", remova esta linha.
        temperature,
        }),
    });
    if (!res.ok) throw new InternalServerErrorException(`OpenAI run error ${res.status}: ${await res.text()}`);
    return res.json();
    }


  private async pollRun(threadId: string, runId: string, timeoutMs = 90_000, intervalMs = 1500) {
    const start = Date.now();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await fetch(`${this.baseUrl}/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers: this.assistantHeaders,
        });

      if (!res.ok) throw new InternalServerErrorException(`OpenAI poll run error ${res.status}: ${await res.text()}`);
      const json = await res.json();

      const status = json.status as string;
      if (status === 'completed') return json;
      if (status === 'failed' || status === 'cancelled' || status === 'expired') {
        throw new InternalServerErrorException(`Assistant run ended with status=${status}`);
      }
      if (Date.now() - start > timeoutMs) {
        throw new InternalServerErrorException(`Assistant run timeout after ${timeoutMs} ms`);
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }
  }

  private async listMessages(threadId: string) {
    const res = await fetch(`${this.baseUrl}/threads/${threadId}/messages?order=desc&limit=10`, {
        method: 'GET',
        headers: this.assistantHeaders,
        });

    if (!res.ok) throw new InternalServerErrorException(`OpenAI list messages error ${res.status}: ${await res.text()}`);
    return res.json();
  }

  private extractHtmlFromAssistant(messagesListJson: any): string {
    const msg = (messagesListJson?.data ?? []).find((m: any) => m.role === 'assistant');
    if (!msg) throw new InternalServerErrorException('Assistant returned no message.');

    const parts = (msg.content ?? []) as AssistantMessagePart[];
    const htmlChunks: string[] = [];

    for (const p of parts) {
        if (p.type === 'text' && typeof p.text?.value === 'string') {
        htmlChunks.push(p.text.value);
        }
    }

    const html = htmlChunks.join('\n').trim();
    if (!html) throw new InternalServerErrorException('Assistant returned empty HTML.');
    return html;
    }


  /**
   * Orquestra: cria thread, adiciona mensagem com texto + imagens (URLs), roda assistant e devolve HTML.
   */
  async runAssistantHtml(params: {
    userText: string;
    imageUrls: string[]; 
    temperature?: number;
    maxOutputTokens?: number;
  }): Promise<string> {
    const { userText, imageUrls, temperature = 0.2, maxOutputTokens = 1500 } = params;

    const threadId = await this.createThread();
    await this.addUserMessageWithImages(threadId, userText, imageUrls);

    const run = await this.runAssistant(threadId, temperature);
    await this.pollRun(threadId, run.id);

    const messages = await this.listMessages(threadId);
    const html = this.extractHtmlFromAssistant(messages);
    return html;
  }

  private get assistantHeaders() {
    return {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
    };
    }
}
