import { Module } from '@nestjs/common';
import {
  Application,
  ConfigModule,
  Environment,
  MongoModule,
  HealthCheckModule,
  HealthCheckType,
} from '@vehicle-observer/shared';
import { VehicleAnalyticModule } from './analytic';

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
    VehicleAnalyticModule,
    WsModule,
  ],
})
export class AppModule {}
