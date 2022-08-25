import { Module } from '@nestjs/common';
import { AnalyticModule } from '@vehicle-observer/shared';
import { dirname } from 'path';

import { VehicleAnalyticService } from './analytic.service';
import {
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult,
} from './type';

@Module({
  imports: [
    AnalyticModule.register<
      VehicleAnalyticProcessorAction,
      VehiclesAnalyticAgregatedResult
    >(
      `${dirname(__filename)}/analytic-worker.processor.js`,
      VehicleAnalyticService,
      { autoStart: true, maxWorkers: 1, taskMaxRetries: 1 },
    ),
  ],
})
export class VehicleAnalyticModule {}
