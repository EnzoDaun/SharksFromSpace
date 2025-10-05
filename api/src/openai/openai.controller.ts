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
   * Ex.: GET /openai/analyze?time=2025-10-04&bbox=-50,-30,-40,-20&width=1280
   */
  @Get('analyze')
  async analyzeRoute(
    @Query(new ValidationPipe({ transform: true })) dto: AnalyzePredictionDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const wmsOptions = dto.toWmsOptions();
    const result = await this.analyze.execute(dto.time, dto.regionHint, wmsOptions);

    // Links via backend (stream PNG) — conveniência p/ o front
    const base = `${req.protocol}://${req.get('host')}`;
    const qsParams: Record<string, string> = { time: dto.time };
    
    if (dto.width) qsParams.width = dto.width.toString();
    if (dto.height) qsParams.height = dto.height.toString();
    if (dto.bbox) qsParams.bbox = dto.bbox;
    if (typeof dto.transparent === 'boolean') qsParams.transparent = dto.transparent.toString();
    
    const qs = new URLSearchParams(qsParams);
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
