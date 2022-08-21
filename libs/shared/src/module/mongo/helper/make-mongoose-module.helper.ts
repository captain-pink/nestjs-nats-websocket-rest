import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import {
  CommonConfig,
  INJECTION_TOKEN_CONFIG,
  MongoConfig,
} from '../../config';

export function makeMongooseModule(
  mongooseOptions: MongooseModuleOptions,
): DynamicModule {
  return MongooseModule.forRootAsync({
    useFactory: (config: ConfigService) => {
      const runtimeConfig = config.get(INJECTION_TOKEN_CONFIG) as CommonConfig;

      return makeMongoOptions(runtimeConfig.mongo, mongooseOptions);
    },
    inject: [ConfigService],
  });
}

function makeMongoOptions(
  { db: dbName, ...options }: MongoConfig,
  mongooseOptions: MongooseModuleOptions,
): MongooseModuleOptions {
  const uri = makeMongoUri(options as MongoConfig);

  return {
    ...mongooseOptions,
    uri,
    dbName,
    autoCreate: true,
  };
}

function makeMongoUri({ username, password, host, port }: MongoConfig): string {
  return `mongodb://${username}:${password}@${host}:${port}/`;
}
