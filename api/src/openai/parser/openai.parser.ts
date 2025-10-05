import { Injectable } from '@nestjs/common';
import { OpenAIAssistantPartType } from '../enums/assistant-message.enum';
import { AssistantMessagePart } from '../interfaces/assistant-message.interface';

@Injectable()
export class OpenAIParser {
  /**
   * Builds user text for Assistant.
   * Main instructions (HTML-only, sections, etc.) should be in Assistant Instructions.
   * Only passes dynamic context (date, region) and indicates 2 images are attached.
   */
  buildUserTextForAssistant(params: {
    time: string;
    regionHint?: string;
  }): string {
    const { time, regionHint } = params;

    const lines = [
      `Data (UTC): ${time}`,
      regionHint ? `Região (dica opcional): ${regionHint}` : undefined,
      'Anexei duas imagens nesta mensagem: (1) clorofila-a; (2) SST.',
      'Use APENAS essas duas imagens para a análise solicitada nas Instructions do Assistant.',
    ].filter(Boolean) as string[];

    return lines.join('\n');
  }

  /**
   * Extracts HTML from assistant response, removing code fences if present
   */
  extractHtmlFromAssistant(messagesListJson: any): string {
    const msg = (messagesListJson?.data ?? []).find(
      (m: any) => m.role === 'assistant',
    );
    if (!msg) {
      throw new Error('Assistant returned no message.');
    }

    const parts = (msg.content ?? []) as AssistantMessagePart[];
    const htmlChunks: string[] = [];

    for (const part of parts) {
      if (
        part.type === OpenAIAssistantPartType.TEXT &&
        typeof part.text?.value === 'string'
      ) {
        htmlChunks.push(part.text.value);
      }
    }

    let html = htmlChunks.join('\n').trim();
    if (!html) {
      throw new Error('Assistant returned empty HTML.');
    }

    // Remove HTML code fences if present
    html = html
      .replace(/```html\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();

    return html;
  }

  ensurePngUrl(url: string): string {
    try {
      const u = new URL(url);
      if (
        u.searchParams.get('format') &&
        u.searchParams.get('format') !== 'image/png'
      ) {
        u.searchParams.set('format', 'image/png');
      }
      return u.toString();
    } catch {
      return url;
    }
  }
}
