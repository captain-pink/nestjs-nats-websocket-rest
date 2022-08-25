import {
  AbstractAnalyticActionPayload,
  AbstractAnalyticActionResult,
  AbstractAnalyticProcessor,
} from '@vehicle-observer/shared';
import { VehicleAnalyticProcessorAction } from './enum';

function divideTestDigit(payload: AbstractAnalyticActionPayload<any>) {
  return Promise.resolve({
    timings: { start: 0, end: 0 },
    data: payload.dataframe / 2,
  });
}

const analyticWorkerProcessor: AbstractAnalyticProcessor<
  VehicleAnalyticProcessorAction,
  any
> = new Map([[VehicleAnalyticProcessorAction.MAX_BY_PERIOD, divideTestDigit]]);

export default analyticWorkerProcessor;
