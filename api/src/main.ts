import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './common/config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Sharks From Space API')
    .setDescription(
      'API para análise de probabilidade de tubarões usando dados de satélite da NASA (Clorofila-a e Temperatura da Superfície do Mar) e análise de IA via OpenAI.',
    )
    .setVersion('1.0')
    .addTag('nasa', 'Endpoints para obter mapas de satélite da NASA')
    .addTag('openai', 'Endpoints para análise de IA sobre probabilidade de tubarões')
    .addServer('http://localhost:3000', 'Local Development')
    .addServer('https://sharksfromspace-api.onrender.com', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Sharks From Space API',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const appConfig = app.get(AppConfigService);
  // Use PORT from environment (Render) or fallback to config
  const port = process.env.PORT || appConfig.port;

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 API up on http://localhost:${port} (env=${appConfig.nodeEnv})`);
  logger.log(`📚 Swagger docs available at http://localhost:${port}/api`);
}
bootstrap();
