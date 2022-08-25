/**
 * TODO: create generic type
 */
export type VehiclesAnalyticAgregatedResult = any;
export type VehicleAnalyticProcessorAction =
  | 'average'
  | 'subtract'
  | 'max'
  | 'min'
  | 'median';
export type VehicleAnalyticJsonDataFrame = Array<Record<string, any>>;
/**
 * TODO:
 * - Abstract fn should be described via generics
 */
export interface AbstractFn {
  (...args: Array<unknown>): unknown;
}
