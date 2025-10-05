import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppConfigService } from './common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lê as configs validadas pelo AppConfigModule
  const config = app.get(AppConfigService);
  const port = config.port;

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 API up on http://localhost:${port} (env=${config.nodeEnv})`);
}
bootstrap();
