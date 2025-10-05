import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { Request, Response } from 'express';

let app: any = null;

async function createNestApp() {
  if (app) {
    return app;
  }

  try {
    console.log('Creating NestJS application...');
    
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    app = await NestFactory.create(AppModule, adapter, {
      logger: ['error', 'warn', 'log'],
    });

    // Enable validation globally
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    // Enable CORS
    app.enableCors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Initialize the app
    await app.init();
    
    console.log('NestJS app initialized successfully');
    return app;
    
  } catch (error: any) {
    console.error('Error creating NestJS app:', error);
    throw error;
  }
}

export default async function handler(req: Request, res: Response) {
  try {
    console.log(`${req.method} ${req.url}`);
    
    const nestApp = await createNestApp();
    const server = nestApp.getHttpAdapter().getInstance();
    
    return server(req, res);
    
  } catch (error: any) {
    console.error('Handler error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'Unknown error occurred',
      timestamp: new Date().toISOString(),
    });
  }
}