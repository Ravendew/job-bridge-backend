import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  // Serve uploaded files
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  // ✅ IMPORTANT FIX
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
