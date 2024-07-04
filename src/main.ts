import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(new AuthMiddleware().use);
  await app.listen(4545);
}
bootstrap();
