import { Injectable } from '@nestjs/common';
import { OpenAIAssistantPartType } from '../enums/assistant-message.enum';
import { AssistantMessagePart } from '../interfaces/assistant-message.interface';

@Injectable()
export class OpenAIParser {
  /**
   * Monta o texto do usuário para o Assistant.
   * As instruções principais (HTML-only, seções, etc.) devem estar no Assistant (Instructions).
   * Aqui passamos apenas o contexto dinâmico (data, região) e indicamos que 2 imagens foram anexadas.
   */
  buildUserTextForAssistant(params: { time: string; regionHint?: string }): string {
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
   * Extrai HTML da resposta do assistant, removendo code fences se vierem
   */
  extractHtmlFromAssistant(messagesListJson: any): string {
    const msg = (messagesListJson?.data ?? []).find((m: any) => m.role === 'assistant');
    if (!msg) {
      throw new Error('Assistant returned no message.');
    }

    const parts = (msg.content ?? []) as AssistantMessagePart[];
    const htmlChunks: string[] = [];

    for (const part of parts) {
      if (part.type === OpenAIAssistantPartType.TEXT && typeof part.text?.value === 'string') {
        htmlChunks.push(part.text.value);
      }
    }

    let html = htmlChunks.join('\n').trim();
    if (!html) {
      throw new Error('Assistant returned empty HTML.');
    }
    
    // Remove code fences HTML se vierem
    html = html.replace(/```html\s*/g, '').replace(/```\s*$/g, '').trim();
    
    return html;
  }

  /**
   * Sanitiza URLs para garantir que são PNG (se você desejar reforçar isso).
   * Mantemos permissivo (o Assistant aceita URLs http/https). Use apenas se precisar.
   */
  ensurePngUrl(url: string): string {
    try {
      const u = new URL(url);
      // Se houver format na query, reforce image/png
      if (u.searchParams.get('format') && u.searchParams.get('format') !== 'image/png') {
        u.searchParams.set('format', 'image/png');
      }
      return u.toString();
    } catch {
      return url;
    }
  }
}
