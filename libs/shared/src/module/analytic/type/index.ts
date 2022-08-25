export type Timeframe = {
  start: number;
  end: number;
};

export type AbstractAnalyticActionPayload<D> = {
  timeframe: Timeframe;
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

export type AbstractAnalyticProcessor<A, R> = Map<A, AbstractAnalyticMethod<R>>;

export interface AnalyticWorkerInstance<A, R>
  extends Omit<WorkerNodesInstance, 'call'> {
  call: AbstractAnalyticProcessor<A, R>;
}
