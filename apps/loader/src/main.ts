import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { INJECTION_TOKEN_CONFIG } from '@vehicle-observer/shared';

import { AppModule } from './app.module';
import { LoaderOptions } from './nats/model';

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
  console.log(loaderOptions.asMicroserviceOptions());
  app.connectMicroservice<MicroserviceOptions>(
    loaderOptions.asMicroserviceOptions(),
  );

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
