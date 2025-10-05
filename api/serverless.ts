import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: ReturnType<typeof serverlessExpress> | null = null;

async function bootstrapServer() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter, { logger: ['error', 'warn', 'log'] });
  app.enableCors({ origin: [/\.vercel\.app$/], credentials: true });
  await app.init();
  return serverlessExpress({ app: expressApp });
}

export default async function handler(req: any, res: any) {
  if (!cachedServer) cachedServer = await bootstrapServer();
  return cachedServer(req, res);
}