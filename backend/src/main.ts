import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  // Abilita CORS per permettere al frontend di comunicare
  app.enableCors({
    origin: true, // permette a qualsiasi origine di accedere
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // permette di accettare richieste con credenziali e quindi token (aggiunta perchè non accettava il token il frontend)
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application running on http://localhost:${port}/api`);
}
bootstrap();