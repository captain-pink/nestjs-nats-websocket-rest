import {
  AbstractAnalyticActionPayload,
  AbstractAnalyticActionResult,
  VehicleMessage,
} from '@vehicle-observer/shared';
import { subtract as subtractR } from 'ramda';
import {
  lastAndFirstEntryField,
  makeComputeMax,
  makeComputeMean,
  makeComputeMedian,
  makeComputeMin,
} from './helper';
import {
  VehicleAnalyticJsonDataFrame,
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult,
} from './type';

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
  { dataframe }: AbstractAnalyticActionPayload<Array<Record<string, any>>>,
): AbstractAnalyticActionResult<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult
> {
  const start = Date.now();

  const computeMean = makeComputeMean(field);
  const result = computeMean(dataframe);

  const end = Date.now();

  return {
    action,
    field,
    timings: { start, end, delta: subtractR(end, start) },
    result,
  };
}

export function subtract(
  action: VehicleAnalyticProcessorAction,
  field: keyof VehicleMessage,
  { dataframe }: AbstractAnalyticActionPayload<VehicleAnalyticJsonDataFrame>,
): AbstractAnalyticActionResult<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult
> {
  const start = Date.now();

  const lastFirst = lastAndFirstEntryField(dataframe, field);
  const result = subtractR(...lastFirst);

  const end = Date.now();

  return {
    action,
    field,
    timings: { start, end, delta: subtractR(end, start) },
    result,
  };
}

export function median(
  action: VehicleAnalyticProcessorAction,
  field: keyof VehicleMessage,
  { dataframe }: AbstractAnalyticActionPayload<Array<Record<string, any>>>,
): AbstractAnalyticActionResult<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult
> {
  const start = Date.now();

  const computeMedian = makeComputeMedian(field);
  const result = computeMedian(dataframe);

  const end = Date.now();

  return {
    action,
    field,
    timings: { start, end, delta: subtractR(end, start) },
    result,
  };
}

export function max(
  action: VehicleAnalyticProcessorAction,
  field: keyof VehicleMessage,
  { dataframe }: AbstractAnalyticActionPayload<Array<Record<string, any>>>,
): AbstractAnalyticActionResult<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult
> {
  const start = Date.now();

  const computeMax = makeComputeMax(field);
  const result = computeMax(dataframe);

  const end = Date.now();

  return {
    action,
    field,
    timings: { start, end, delta: subtractR(end, start) },
    result,
  };
}

export function min(
  action: VehicleAnalyticProcessorAction,
  field: keyof VehicleMessage,
  { dataframe }: AbstractAnalyticActionPayload<Array<Record<string, any>>>,
): AbstractAnalyticActionResult<
  VehicleAnalyticProcessorAction,
  VehiclesAnalyticAgregatedResult
> {
  const start = Date.now();

  const computeMin = makeComputeMin(field);
  const result = computeMin(dataframe);

  const end = Date.now();

  return {
    action,
    field,
    timings: { start, end, delta: subtractR(end, start) },
    result,
  };
}
