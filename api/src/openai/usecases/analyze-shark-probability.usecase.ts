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
   * Builds WMS URLs (PNG) for chlorophyll and SST, sends to Assistant and returns HTML.
   * Orchestrates without duplicating URL construction (always via parser/build...Url).
   * Does not call fetch directly — uses NasaIntegration.
   */
  async execute(
    time: string,
    regionHint?: string,
    wmsOptions?: any,
  ): Promise<{ html: string }> {
    const baseOptions = {
      format: NasaFormatEnum.PNG,
      width: 1280,
      styles: NasaStylesEnum.DEFAULT,
      ...wmsOptions,
    };

    const chlorophyllUrl = this.buildUrl.chlorophyllUrl(time, {
      ...baseOptions,
      transparent: baseOptions.transparent ?? true,
    });

    const sstUrl = this.buildUrl.sstUrl(time, {
      ...baseOptions,
      transparent: baseOptions.transparent ?? false,
    });

    const userText = this.parser.buildUserTextForAssistant({
      time,
      regionHint,
    });

    const html = await this.openai.runAssistantHtml({
      userText,
      imageUrls: [chlorophyllUrl, sstUrl],
    });

    return {
      html,
    };
  }
}
