import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.ts';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log('Application running on http://localhost:3000/api');
}
bootstrap();
