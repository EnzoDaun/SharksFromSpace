import { Controller, Get, Query, Req, Res, ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AnalyzePredictionDto } from './dto/analyze-prediction.dto';
import { AnalyzeSharkProbabilityUseCase } from './usecases/analyze-shark-probability.usecase';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly analyze: AnalyzeSharkProbabilityUseCase) {}

  /**
   * Retorna JSON com:
   * - time
   * - images: { chlorophyllUrl, sstUrl, chlorophyllBackendUrl, sstBackendUrl }
   * - html: string (conteúdo HTML do Assistant)
   *
   * Ex.: GET /openai/analyze?time=2025-10-04
   */
  @Get('analyze')
  async analyzeRoute(
    @Query(new ValidationPipe({ transform: true })) dto: AnalyzePredictionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.analyze.execute(dto.time, dto.regionHint);

    // Links via backend (stream PNG) — conveniência p/ o front
    const base = `${req.protocol}://${req.get('host')}`;
    const qs = new URLSearchParams({ time: dto.time, width: '1280' });
    const chlorophyllBackendUrl = `${base}/nasa/chlorophyll.png?${qs.toString()}`;
    const sstBackendUrl = `${base}/nasa/sst.png?${qs.toString()}`;

    res.json({
      time: result.time,
      images: {
        // URLs WMS exatas usadas pelo Assistant
        chlorophyllUrl: result.images.chlorophyllUrl,
        sstUrl: result.images.sstUrl,
        // Alternativas servidas pelo seu backend
        chlorophyllBackendUrl,
        sstBackendUrl,
      },
      html: result.html,
    });
  }
}
