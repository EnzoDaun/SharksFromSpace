import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIModel } from '../enums/openai-model.enum';

@Injectable()
export class OpenAIIntegration {
  constructor(private readonly config: ConfigService) {}

  private get apiKey(): string {
    const key = this.config.get<string>('OPENAI_API_KEY', '');
    if (!key) {
      throw new InternalServerErrorException('OPENAI_API_KEY is missing.');
    }
    return key;
  }

  private get baseUrl(): string {
    return this.config.get<string>('OPENAI_BASE_URL', 'https://api.openai.com/v1');
  }

  private get model(): string {
    // se houver OPENAI_MODEL no .env, usa ele; senão, default para gpt-4o
    return this.config.get<string>('OPENAI_MODEL') ?? OpenAIModel.GPT_4O;
  }

  /**
   * Chama Chat Completions (multimodal) pedindo JSON puro via response_format.
   */
  async chatCompletionsJSON(messages: any[]): Promise<string> {
    const url = `${this.baseUrl}/chat/completions`;
    const body = {
      model: this.model,
      messages,
      temperature: 0.2,
      response_format: { type: 'json_object' },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new InternalServerErrorException(`OpenAI error ${res.status}: ${text}`);
    }

    const json = await res.json();
    const content =
      json?.choices?.[0]?.message?.content ??
      (() => {
        throw new InternalServerErrorException('OpenAI returned empty content.');
      })();

    return content;
  }
}
