import { Module, Type } from '@nestjs/common';
import { AbstractAnalyticService } from './analytic.service.abstract';

@Module({})
export class AnalyticModule {
  static register<A, R>(
    processorPath: string,
    classRef: Type<AbstractAnalyticService<A, R>>,
    options?: Options,
  ) {
    return {
      module: AnalyticModule,
      providers: [
        {
          provide: AbstractAnalyticService,
          useFactory: () => {
            return new classRef(processorPath, options);
          },
        },
      ],
    };
  }
}
