import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { join } from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware per file statici e cookie PRIMA di CORS
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use(cookieParser());

  // CORS configurazione migliorata
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000', // Aggiunto per compatibilità
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Aggiunto PATCH
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cookie',           // Aggiunto Cookie
      'Set-Cookie',       // Aggiunto Set-Cookie
      'Origin',           // Aggiunto Origin
      'X-Requested-With', // Aggiunto per compatibilità
      'Accept',           // Aggiunto Accept
    ],
    exposedHeaders: ['Set-Cookie'], // Permette al frontend di leggere i cookie
    preflightContinue: false,       // Gestisce preflight automaticamente
    optionsSuccessStatus: 204,      // Status per OPTIONS requests
  });

  // Global filters e prefix
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  // Log di avvio migliorato
  console.log('🚀 Application running on http://localhost:3001');
  console.log('📡 API endpoints available at http://localhost:3001/api');
  console.log('📁 Static files served at http://localhost:3001/uploads');
  console.log('🌐 CORS enabled for http://localhost:3000');

  await app.listen(3001);
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});