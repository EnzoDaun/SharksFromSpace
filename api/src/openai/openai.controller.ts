import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AnalyzePredictionDto } from './dto/analyze-prediction.dto';
import { AnalyzeSharkProbabilityUseCase } from './usecases/analyze-shark-probability.usecase';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly analyze: AnalyzeSharkProbabilityUseCase) {}

  @Get('analyze')
  async analyzeRoute(@Query(new ValidationPipe({ transform: true })) dto: AnalyzePredictionDto) {
    return this.analyze.execute(dto.time, dto.regionHint);
  }
}
