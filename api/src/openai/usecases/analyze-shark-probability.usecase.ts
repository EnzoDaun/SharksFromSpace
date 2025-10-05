import { Injectable } from '@nestjs/common';
import { BuildWmsUrlUseCase } from '../../nasa/usecases/build-wms-url.usecase';
import { NasaConfigService } from '../../common/config/nasa.config';
import { OpenAIParser } from '../parser/openai.parser';
import { OpenAIIntegration } from '../integration/openai.integration';

@Injectable()
export class AnalyzeSharkProbabilityUseCase {
  constructor(
    private readonly buildUrl: BuildWmsUrlUseCase,
    private readonly nasaCfg: NasaConfigService,
    private readonly parser: OpenAIParser,
    private readonly openai: OpenAIIntegration,
  ) {}

  /**
   * Monta as URLs WMS (PNG) para clorofila e SST, envia ao Assistant e retorna o HTML final.
   * Mantemos proporções do bbox padrão (mundo) — o WMS renderiza corretamente.
   */
  async execute(time: string, regionHint?: string): Promise<string> {
    // 1) URLs WMS em PNG
    const chlaUrl = this.buildUrl.chlorophyllUrl(time, {
      format: 'image/png',
      transparent: true, // clorofila com alpha útil
      width: 1280,
      // height opcional: se não enviar, o parser usa proporção do bbox
    });

    const sstUrl = this.buildUrl.sstUrl(time, {
      format: 'image/png',
      transparent: false, // SST opaca para evitar aparência "branca" por alpha
      width: 1280,
    });

    // 2) Texto curto do usuário (o prompt principal está no Assistant)
    const userText = this.parser.buildUserTextForAssistant({ time, regionHint });

    // 3) Chama Assistants API e retorna HTML
    const html = await this.openai.runAssistantHtml({
      userText,
      imageUrls: [chlaUrl, sstUrl],
      temperature: 0.2,
      maxOutputTokens: 1500,
    });

    return html;
  }
}
