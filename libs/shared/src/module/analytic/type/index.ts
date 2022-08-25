export type Timeframe = {
  start: number;
  end: number;
  delta?: number;
};

export type AbstractAnalyticActionPayload<D> = {
  dataframe: D;
};

export type AbstractAnalyticActionResult<A, R> = {
  action: A;
  field: string;
  timings: Timeframe;
  result: R;
};

export interface AbstractAnalyticMethod<A, R> {
  <D>(payload: AbstractAnalyticActionPayload<D>): Promise<
    AbstractAnalyticActionResult<A, R>
  >;
}

export type AbstractAnalyticProcessor<A extends string, R> = {
  [key in A]: AbstractAnalyticMethod<A, R>;
};

export interface AnalyticWorkerInstance<A extends string, R>
  extends Omit<WorkerNodesInstance, 'call'> {
  call: AbstractAnalyticProcessor<A, R>;
}
