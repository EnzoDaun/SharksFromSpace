import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation';
import { AppConfigService } from './config.service';
import { NasaConfigService } from './nasa.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: envValidationSchema,
      envFilePath: ['.env'],
    }),
  ],
  providers: [AppConfigService, NasaConfigService],
  exports: [AppConfigService, NasaConfigService],
})
export class AppConfigModule {}
