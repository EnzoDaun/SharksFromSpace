import { Module } from '@nestjs/common';
import { OpenAIController } from './openai.controller';
import { OpenAIParser } from './parser/openai.parser';
import { OpenAIIntegration } from './integration/openai.integration';
import { AnalyzeSharkProbabilityUseCase } from './usecases/analyze-shark-probability.usecase';
import { NasaModule } from '../nasa/nasa.module';

@Module({
  imports: [NasaModule],
  controllers: [OpenAIController],
  providers: [OpenAIParser, OpenAIIntegration, AnalyzeSharkProbabilityUseCase],
})
export class OpenAIModule {}
