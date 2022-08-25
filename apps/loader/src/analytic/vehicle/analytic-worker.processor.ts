import {
  AbstractAnalyticActionPayload,
  AbstractAnalyticActionResult,
  VehicleMessage,
  VehicleMessageDocument,
} from '@vehicle-observer/shared';
import { curry, map, mean, pipe, prop } from 'ramda';
import {
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult,
} from './type';

/**
 * TODO:
 * - Abstract fn should be described via generics
 */
interface AbstractFn {
  (...args: Array<unknown>): unknown;
}

const makeMapFieldWith = curry((fn: AbstractFn, key: string) => {
  const mapper = map(prop(key));

  return pipe(mapper, fn);
});

const makeComputeMean = makeMapFieldWith(mean);

export function divideTestDigit(payload) {
  return Promise.resolve({
    timings: { start: 0, end: 0 },
    data: payload.dataframe / 2,
  });
}

/**
 * TODO:
 * - To improve performance metric approach.
 * Performance std lib to use.
 * - To move to decorator.
 * - To adjust type to Mongo type.
 * @param payload AbstractAnalyticActionPayload<VehicleMessageDocument>
 * @returns AbstractAnalyticActionResult<VehiclesAnalyticAgregatedResult>
 */
export function average(
  action: VehicleAnalyticProcessorAction,
  field: keyof VehicleMessage,
  payload: AbstractAnalyticActionPayload<Array<Record<string, any>>>,
): AbstractAnalyticActionResult<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult
> {
  const start = Date.now();

  const computeMeanSpeed = makeComputeMean(field);

  const result = computeMeanSpeed(payload.dataframe);

  const end = Date.now();

  return {
    action,
    field,
    timings: { start, end, delta: end - start },
    result,
  };
}
