export type Timeframe = {
  start: number;
  end: number;
};

export type AbstractAnalyticActionPayload<D> = {
  dataframe: D;
};

export type AbstractAnalyticActionResult<R> = {
  timings: Timeframe;
  data: R;
};

export interface AbstractAnalyticMethod<R> {
  <D>(payload: AbstractAnalyticActionPayload<D>): Promise<
    AbstractAnalyticActionResult<R>
  >;
}

export type AbstractAnalyticProcessor<A extends string, R> = {
  [key in A]: AbstractAnalyticMethod<R>;
};

export interface AnalyticWorkerInstance<A extends string, R>
  extends Omit<WorkerNodesInstance, 'call'> {
  call: AbstractAnalyticProcessor<A, R>;
}
