import { Injectable, Logger } from '@nestjs/common';
import {
  AbstractAnalyticActionPayload,
  AbstractAnalyticActionResult,
  AbstractAnalyticService,
} from '@vehicle-observer/shared';

import {
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult,
} from './type';

@Injectable()
export class VehicleAnalyticService extends AbstractAnalyticService<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult
> {
  private readonly logger = new Logger(VehicleAnalyticService.name);

  constructor(processorPath: string, options?: Options) {
    super(processorPath, options);

    this.logger.log('coonstructor: workerNodes ready');
  }

  async analyse<D>(
    action: VehicleAnalyticProcessorAction,
    payload: AbstractAnalyticActionPayload<D>,
  ): Promise<AbstractAnalyticActionResult<VehiclesAnalyticAgregatedResult>> {
    return (this.workerNodes.call as any)[action](payload);
  }
}
