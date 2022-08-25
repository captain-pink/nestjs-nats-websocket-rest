import { Module } from '@nestjs/common';
import { AnalyticModule } from '@vehicle-observer/shared';
import { dirname } from 'path';

import { VehicleAnalyticService } from './analytic.service';
import { VehicleAnalyticProcessorAction } from './enum';
import { VehiclesAnalyticAgregatedDataResult } from './type';

@Module({
  imports: [
    AnalyticModule.register<
      VehicleAnalyticProcessorAction,
      VehiclesAnalyticAgregatedDataResult
    >(
      `${__dirname}/src/analytic/vehicle/analytic-worker.processor`,
      VehicleAnalyticService,
    ),
  ],
})
export class VehicleAnalyticModule {}
