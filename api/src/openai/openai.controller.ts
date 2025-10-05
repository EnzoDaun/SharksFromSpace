import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AnalyzePredictionDto } from './dto/analyze-prediction.dto';
import { AnalyzeSharkProbabilityUseCase } from './usecases/analyze-shark-probability.usecase';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly analyze: AnalyzeSharkProbabilityUseCase) {}

  /**
   * Retorna apenas o HTML gerado pela análise da OpenAI.
   * As imagens devem ser obtidas diretamente das rotas NASA.
   * Mantém contrato de resposta intacto.
   *
   * Ex.: GET /openai/analyze?time=2025-10-04&bbox=-50,-30,-40,-20&width=1280
   */
  @Get('analyze')
  async analyzeRoute(
    @Query(new ValidationPipe({ transform: true })) dto: AnalyzePredictionDto,
  ): Promise<{ html: string }> {
    const wmsOptions = dto.toWmsOptions();
    const result = await this.analyze.execute(dto.time, dto.regionHint, wmsOptions);

    return {
      html: result.html,
    };
  }
}
