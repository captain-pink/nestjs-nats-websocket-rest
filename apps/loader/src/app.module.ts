import { Module } from '@nestjs/common';
import {
  Application,
  ConfigModule,
  Environment,
  MongoModule,
  HealthCheckModule,
  HealthCheckType,
} from '@vehicle-observer/shared';

import { LoaderModule } from './loader/loader.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [
    ConfigModule.registerAsync({
      type: Application.LOADER,
      env: Environment.DEV,
    }),
    MongoModule.registerAsync({}),
    HealthCheckModule.forRootAsync(HealthCheckType.MICROSERVICE),
    LoaderModule,
    WsModule,
  ],
})
export class AppModule {}
