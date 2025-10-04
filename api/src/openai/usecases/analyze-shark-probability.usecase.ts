import { Injectable } from '@nestjs/common';
import { GetChlorophyllMapUseCase } from '../../nasa/usecases/get-chlorophyll-map.usecase';
import { GetSstMapUseCase } from '../../nasa/usecases/get-sst-map.usecase';
import { OpenAIParser } from '../parser/openai.parser';
import { OpenAIIntegration } from '../integration/openai.integration';
import { OpenAIAnalysis } from '../interfaces/openai-analysis.interface';

@Injectable()
export class AnalyzeSharkProbabilityUseCase {
  constructor(
    private readonly getChla: GetChlorophyllMapUseCase,
    private readonly getSst: GetSstMapUseCase,
    private readonly parser: OpenAIParser,
    private readonly openai: OpenAIIntegration,
  ) {}

  async execute(time: string, regionHint?: string): Promise<{
    time: string;
    chlorophyll: { url: string; dataUrl: string };
    sst: { url: string; dataUrl: string };
    analysis: OpenAIAnalysis;
  }> {
    const [chla, sst] = await Promise.all([
      this.getChla.execute(time, { width: 1280, transparent: true }),
      this.getSst.execute(time, { width: 1280, transparent: true }),
    ]);

    const chlaDataUrl = `data:${chla.contentType};base64,${chla.buffer.toString('base64')}`;
    const sstDataUrl = `data:${sst.contentType};base64,${sst.buffer.toString('base64')}`;

    const messages = this.parser.buildMessages({
      time,
      regionHint,
      chlorophyllDataUrl: chlaDataUrl,
      sstDataUrl,
    });

    const content = await this.openai.chatCompletionsJSON(messages);
    const analysis = this.parser.safeParse(content);

    return {
      time,
      chlorophyll: { url: chla.url, dataUrl: chlaDataUrl },
      sst: { url: sst.url, dataUrl: sstDataUrl },
      analysis,
    };
  }
}
