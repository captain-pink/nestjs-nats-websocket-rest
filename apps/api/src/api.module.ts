import { Module } from '@nestjs/common';
import {
  Application,
  ConfigModule,
  Environment,
  HealthCheckModule,
  HealthCheckType,
  MongoModule,
} from '@vehicle-observer/shared';

import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    HealthCheckModule.forRootAsync(HealthCheckType.API),
    VehicleModule,
    ConfigModule.registerAsync({
      type: Application.API,
      env: Environment.DEV,
    }),
    MongoModule.registerAsync({}),
  ],
  controllers: [],
})
export class ApiModule {}
