import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './common/config/config.module';
import { NasaModule } from './nasa/nasa.module';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [AppConfigModule, NasaModule, OpenAIModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
