import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { AbstractAnalyticService } from './analytic.service.abstract';

@Global()
@Module({})
export class AnalyticModule {
  static register<A extends string, R>(
    processorPath: string,
    classRef: Type<AbstractAnalyticService<A, R>>,
    options?: Options,
  ): DynamicModule {
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
      exports: [AbstractAnalyticService],
    };
  }
}
