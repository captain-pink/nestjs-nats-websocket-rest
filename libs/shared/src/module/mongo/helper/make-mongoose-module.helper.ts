import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { INJECTION_TOKEN_CONFIG } from '../../config';
import { MongooseUserOptions } from '../type';

export function makeMongooseModule(
  mongooseOptions: MongooseModuleOptions,
): DynamicModule {
  return MongooseModule.forRootAsync({
    useFactory: (config: ConfigService) => {
      const runtimeConfig = config.get(INJECTION_TOKEN_CONFIG);
      const uri = makeMongoUri(runtimeConfig.mongo as MongooseUserOptions);

      return { uri, ...mongooseOptions };
    },
    inject: [ConfigService],
  });
}

function makeMongoUri({
  username,
  password,
  host,
  port,
}: MongooseUserOptions): string {
  return `mongodb://${username}:${password}@${host}:${port}/`;
}
