import { Injectable } from '@nestjs/common';
import { BuildWmsUrlUseCase } from '../../nasa/usecases/build-wms-url.usecase';
import { OpenAIParser } from '../parser/openai.parser';
import { OpenAIIntegration } from '../integration/openai.integration';

@Injectable()
export class AnalyzeSharkProbabilityUseCase {
  constructor(
    private readonly buildUrl: BuildWmsUrlUseCase,
    private readonly parser: OpenAIParser,
    private readonly openai: OpenAIIntegration,
  ) {}

  /**
   * Monta as URLs WMS (PNG) para clorofila e SST, envia ao Assistant e retorna:
   * { time, images: { chlorophyllUrl, sstUrl }, html }
   */
  async execute(
    time: string,
    regionHint?: string,
  ): Promise<{ time: string; images: { chlorophyllUrl: string; sstUrl: string }; html: string }> {
    // 1) URLs WMS em PNG usadas pelo Assistant
    const chlorophyllUrl = this.buildUrl.chlorophyllUrl(time, {
      format: 'image/png',
      transparent: true, // alpha útil para clorofila
      width: 1280,
    });

    const sstUrl = this.buildUrl.sstUrl(time, {
      format: 'image/png',
      transparent: false, // evitar aparência "branca" por alpha na SST
      width: 1280,
    });

    // 2) Texto curto do usuário (as Instructions estão no Assistant)
    const userText = this.parser.buildUserTextForAssistant({ time, regionHint });

    // 3) Executa Assistants API e obtém HTML
    const html = await this.openai.runAssistantHtml({
      userText,
      imageUrls: [chlorophyllUrl, sstUrl],
    });

    return {
      time,
      images: {
        chlorophyllUrl,
        sstUrl,
      },
      html,
    };
  }
}
