import { Injectable } from '@nestjs/common';
import { BuildWmsUrlUseCase } from '../../nasa/usecases/build-wms-url.usecase';
import { OpenAIParser } from '../parser/openai.parser';
import { OpenAIIntegration } from '../integration/openai.integration';
import { NasaFormatEnum } from '../../nasa/enums/nasa-format.enum';
import { NasaStylesEnum } from '../../nasa/enums/nasa-styles.enum';

@Injectable()
export class AnalyzeSharkProbabilityUseCase {
  constructor(
    private readonly buildUrl: BuildWmsUrlUseCase,
    private readonly parser: OpenAIParser,
    private readonly openai: OpenAIIntegration,
  ) {}

  /**
   * Monta as URLs WMS (PNG) para clorofila e SST, envia ao Assistant e retorna apenas o HTML.
   * Orquestra sem duplicar construção de URL (sempre via parser/build...Url).
   * Não chama fetch direto — usa a NasaIntegration.
   */
  async execute(
    time: string,
    regionHint?: string,
    wmsOptions?: any, // opções vindas do DTO para manter consistência
  ): Promise<{ html: string }> {
    // Defaults para garantir consistência com as rotas diretas
    const baseOptions = {
      format: NasaFormatEnum.PNG,
      width: 1280,
      styles: NasaStylesEnum.DEFAULT,
      ...wmsOptions, // permite override dos parâmetros
    };

    // 1) URLs WMS em PNG usadas pelo Assistant
    const chlorophyllUrl = this.buildUrl.chlorophyllUrl(time, {
      ...baseOptions,
      transparent: baseOptions.transparent ?? true, // alpha útil para clorofila
    });

    const sstUrl = this.buildUrl.sstUrl(time, {
      ...baseOptions,
      transparent: baseOptions.transparent ?? false, // evitar aparência "branca" por alpha na SST
    });

    // 2) Texto curto do usuário (as Instructions estão no Assistant)
    const userText = this.parser.buildUserTextForAssistant({ time, regionHint });

    // 3) Executa Assistants API e obtém HTML
    const html = await this.openai.runAssistantHtml({
      userText,
      imageUrls: [chlorophyllUrl, sstUrl],
    });

    return {
      html,
    };
  }
}
