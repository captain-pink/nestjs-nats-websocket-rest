import { Injectable, Logger } from '@nestjs/common';
import WorkerNodes from 'worker-nodes';
import {
  AbstractAnalyticActionPayload,
  AnalyticWorkerInstance,
  AbstractAnalyticActionResult,
} from './type';

@Injectable()
export abstract class AbstractAnalyticService<A, R> {
  private readonly abstractLogger = new Logger(AbstractAnalyticService.name);
  private readonly workerNodes: AnalyticWorkerInstance<A, R>;

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

  async analyse<D>(
    action: A,
    payload: AbstractAnalyticActionPayload<D>,
  ): Promise<AbstractAnalyticActionResult<R>> {
    const processor = (this.workerNodes.call as any)();
    console.log('processor', await processor);
    const method = processor.get(action);

    this.abstractLogger.log(`analyse:method: ${method.name}`);

    return method(payload);
  }
}
