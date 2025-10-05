import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAIParser {
  /**
   * Monta o texto do usuário para o Assistant.
   * As instruções principais (HTML-only, seções, etc.) devem estar no Assistant (Instructions).
   * Aqui passamos apenas o contexto dinâmico (data, região) e indicamos que 2 imagens foram anexadas.
   */
  buildUserTextForAssistant(params: { time: string; regionHint?: string }) {
    const { time, regionHint } = params;

    const lines = [
      `Data (UTC): ${time}`,
      regionHint ? `Região (dica opcional): ${regionHint}` : undefined,
      'AnexeI duas imagens nesta mensagem: (1) clorofila-a; (2) SST.',
      'Use APENAS essas duas imagens para a análise solicitada nas Instructions do Assistant.',
    ].filter(Boolean) as string[];

    return lines.join('\n');
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
