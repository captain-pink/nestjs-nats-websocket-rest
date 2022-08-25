import { Injectable, Logger } from '@nestjs/common';
import {
  AbstractAnalyticActionPayload,
  AbstractAnalyticActionResult,
  AbstractAnalyticService,
  VehicleMessage,
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
    field: keyof VehicleMessage,
    payload: AbstractAnalyticActionPayload<D>,
  ): Promise<
    AbstractAnalyticActionResult<
      VehicleAnalyticProcessorAction,
      VehiclesAnalyticAgregatedResult
    >
  > {
    return (this.workerNodes.call as any)[action](action, field, payload);
  }
}
