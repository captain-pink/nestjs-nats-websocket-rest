import { Logger } from '@nestjs/common';
import { AbstractAnalyticService } from '@vehicle-observer/shared';
import { VehicleAnalyticProcessorAction } from './enum';
import { VehiclesAnalyticAgregatedDataResult } from './type';

export class VehicleAnalyticService extends AbstractAnalyticService<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedDataResult
> {
  private readonly logger = new Logger(VehicleAnalyticService.name);

  constructor(processorPath: string, options?: Options) {
    super(processorPath, options);

    this.logger.log('coonstructor: workerNodes ready');
  }

  // async analyse<D>(
  //   action: VehicleAnalyticProcessorAction,
  //   payload: AnalyticMethodPayload<D>,
  // ): Promise<AnalyticMethodResult<any>> {
  //   const method = this.workerNodes.call.get(action);

  //   this.logger.log(`analyse:method: ${method.name}`);

  //   return method(payload);
  // }
}
