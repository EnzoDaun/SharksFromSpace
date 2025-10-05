import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: ReturnType<typeof serverlessExpress> | null = null;

async function createServer() {
  try {
    console.log('Creating NestJS application...');
    
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    const app = await NestFactory.create(AppModule, adapter, {
      logger: ['error', 'warn', 'log'],
    });

    // Enable validation globally
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    // Enable CORS for Vercel domains
    app.enableCors({
      origin: [/\.vercel\.app$/],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Initialize the app without listening
    await app.init();
    
    console.log('NestJS app initialized successfully');
    
    // Return serverless express handler
    return serverlessExpress({ app: expressApp });
    
  } catch (error: any) {
    console.error('Error creating NestJS app:', error);
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  try {
    console.log(`${req.method} ${req.url}`);
    
    if (!cachedServer) {
      cachedServer = await createServer();
    }
    
    return cachedServer(req, res);
    
  } catch (error: any) {
    console.error('Handler error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'Unknown error occurred',
      timestamp: new Date().toISOString(),
    });
  }
}