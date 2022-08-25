import { Injectable, Logger } from '@nestjs/common';
import WorkerNodes from 'worker-nodes';

import {
  AbstractAnalyticActionPayload,
  AnalyticWorkerInstance,
  AbstractAnalyticActionResult,
} from './type';

@Injectable()
export abstract class AbstractAnalyticService<A extends string, R> {
  private readonly abstractLogger = new Logger(AbstractAnalyticService.name);
  protected readonly workerNodes: AnalyticWorkerInstance<A, R>;

  constructor(path: string, options: Options) {
    this.workerNodes = new WorkerNodes(
      path,
      options,
    ) as unknown as AnalyticWorkerInstance<A, R>;

    this.abstractLogger.log(
      `constructor: initialize workerNodes. Path: ${path}, options: ${JSON.stringify(
        options,
      )}`,
    );
  }

  abstract analyse<D>(
    action: A,
    payload: AbstractAnalyticActionPayload<D>,
  ): Promise<AbstractAnalyticActionResult<R>>;
}
