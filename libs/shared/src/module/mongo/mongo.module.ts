import { DynamicModule, Module } from '@nestjs/common';
import {
  ModelDefinition,
  MongooseModule,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

import { makeMongooseModule } from './helper';

@Module({})
export class MongoModule {
  static registerAsync(mongooseOptions: MongooseModuleOptions): DynamicModule {
    const mongooseModule = makeMongooseModule(mongooseOptions);

    return {
      module: MongoModule,
      imports: [mongooseModule],
    };
  }

  static forFeature(
    models?: ModelDefinition[],
    connectionName?: string,
  ): DynamicModule {
    return MongooseModule.forFeature(models, connectionName);
  }
}
