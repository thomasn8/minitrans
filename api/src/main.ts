import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(4000);
}
bootstrap();
