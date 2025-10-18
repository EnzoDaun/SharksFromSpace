import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AnalyzePredictionDto } from './dto/analyze-prediction.dto';
import { AnalyzeSharkProbabilityUseCase } from './usecases/analyze-shark-probability.usecase';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('openai')
@Controller('openai')
export class OpenAIController {
  constructor(private readonly analyze: AnalyzeSharkProbabilityUseCase) {}

  @Get('analyze')
  @ApiOperation({
    summary: 'Análise de probabilidade de tubarões via IA',
    description:
      'Retorna uma análise HTML gerada pela OpenAI sobre a probabilidade de presença de tubarões baseada nos dados de Clorofila-a e SST da NASA para uma data específica.',
  })
  @ApiQuery({
    name: 'time',
    required: true,
    description: 'Data no formato YYYY-MM-DD',
    example: '2024-05-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Análise HTML gerada com sucesso',
    schema: {
      example: {
        html: '<html><body><h1>Análise de Probabilidade de Tubarões</h1><p>Baseado nos dados de 2024-05-15...</p></body></html>',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Data inválida ou parâmetros incorretos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao processar análise de IA',
  })
  async analyzeRoute(
    @Query(new ValidationPipe({ transform: true })) dto: AnalyzePredictionDto,
  ): Promise<{ html: string }> {
    const wmsOptions = dto.toWmsOptions();
    const result = await this.analyze.execute(
      dto.time,
      dto.regionHint,
      wmsOptions,
    );

    return {
      html: result.html,
    };
  }
}
