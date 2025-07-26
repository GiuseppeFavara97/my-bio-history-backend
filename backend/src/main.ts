import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Abilita CORS per permettere al frontend di comunicare
  app.enableCors({
    origin: 'http://localhost:3000', // URL del frontend
    credentials: true,               // se usi cookie o autenticazione
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(3001);

  console.log('Application running on http://localhost:3001/api');
}
bootstrap();