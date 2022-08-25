import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  INJECTION_TOKEN_CONFIG,
  LoaderOptions,
} from '@vehicle-observer/shared';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const config = configService.get(INJECTION_TOKEN_CONFIG);

  const { host, port, transport, protocol } = config.loader;
  const loaderOptions = new LoaderOptions({
    host,
    port,
    protocol,
    transport,
  });

  app.connectMicroservice<MicroserviceOptions>(
    loaderOptions.asMicroserviceOptions(),
  );

  app.useWebSocketAdapter(new IoAdapter());

  await app.startAllMicroservices();

  const { port: ws_port } = config.ws;

  await app.listen(ws_port);
}

bootstrap();
