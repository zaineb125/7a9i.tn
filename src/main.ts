import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const corsOptions = {
    origin: ['http://localhost:4200'],
    credentials: true,
    optionsSuccessStatus: 200
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(({transform: true})));
  app.use(cookieParser());
  app.enableCors(corsOptions);
  dotenv.config();
  await app.listen(3000);
}
bootstrap();