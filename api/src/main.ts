import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  const config = app.get(AppConfigService);
  // Use PORT from environment (Render) or fallback to config
  const port = process.env.PORT || config.port;

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 API up on http://localhost:${port} (env=${config.nodeEnv})`);
}
bootstrap();
