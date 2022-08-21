import { Module } from '@nestjs/common';
import { VehicleMessageModule } from '@vehicle-observer/shared';

import { VehicleController } from './vehicle.controller';

@Module({
  imports: [VehicleMessageModule],
  controllers: [VehicleController],
})
export class VehicleModule {}
