import {
  curry,
  map,
  mean,
  pipe,
  prop,
  median,
  max,
  min,
  reduce,
  length,
  gte,
  last,
} from 'ramda';
import { InvalidDataframeError } from '../../error';
import { AbstractFn, VehicleAnalyticJsonDataFrame } from '../type';

const makeMapFieldWith = curry((fn: AbstractFn, key: string) => {
  const mapper = map(prop(key));

  return pipe(mapper, fn);
});

export const makeComputeMean = makeMapFieldWith(mean);
export const makeComputeMedian = makeMapFieldWith(median);
export const makeComputeMax = makeMapFieldWith(reduce(max, -Infinity));
export const makeComputeMin = makeMapFieldWith(reduce(min, Infinity));

/**
 * TODO:
 * - propagate error to client
 * @param dataframe json dataframe VehicleAnalyticJsonDataFrame
 * @param field key string
 * @returns first and last value
 */
export function lastAndFirstEntryField(
  dataframe: VehicleAnalyticJsonDataFrame,
  field: string,
): [number, number] {
  const isLengthLessOrEqualsOne = pipe(length, gte(1));

  if (isLengthLessOrEqualsOne(dataframe)) {
    throw new InvalidDataframeError();
  }

  const lastEntry = last(dataframe);
  const firstEntry = prop(0, dataframe);

  return [prop(field, lastEntry), prop(field, firstEntry)];
}
