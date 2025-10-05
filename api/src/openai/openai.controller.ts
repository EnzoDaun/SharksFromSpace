import { Controller, Get, Query, Res, ValidationPipe } from '@nestjs/common';
import type { Response } from 'express';
import { AnalyzePredictionDto } from './dto/analyze-prediction.dto';
import { AnalyzeSharkProbabilityUseCase } from './usecases/analyze-shark-probability.usecase';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly analyze: AnalyzeSharkProbabilityUseCase) {}

  /**
   * Retorna APENAS HTML (string) com a análise final.
   * Ex.: GET /openai/analyze?time=2025-10-04
   */
  @Get('analyze')
  async analyzeRoute(
    @Query(new ValidationPipe({ transform: true })) dto: AnalyzePredictionDto,
    @Res() res: Response,
  ) {
    const html = await this.analyze.execute(dto.time, dto.regionHint);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }
}
