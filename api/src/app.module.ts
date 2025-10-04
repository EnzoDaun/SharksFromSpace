import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './common/config/config.module';
import { NasaModule } from './nasa/nasa.module';

@Module({
  imports: [AppConfigModule, NasaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
