import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { INJECTION_TOKEN_CONFIG } from '@vehicle-observer/shared';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const { port } = configService.get(INJECTION_TOKEN_CONFIG).api;

  await app.listen(port);
}
bootstrap();
