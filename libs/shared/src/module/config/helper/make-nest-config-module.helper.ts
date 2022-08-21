import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Application } from '../enum';

import { ConfigModuleOptions } from '../type';
import { chooseEnvPath } from './choose-env-path.helper';
import { makeConfigFactory } from './make-config-factory.helper';

export function makeNestConfigModule({ type, env }: ConfigModuleOptions) {
  const applicationSpecificEnvFilePath = chooseEnvPath(type, env);
  const commonEnvFilePath = chooseEnvPath(Application.COMMON, env);

  return NestConfigModule.forRoot({
    envFilePath: [applicationSpecificEnvFilePath, commonEnvFilePath],
    isGlobal: true,
    load: [makeConfigFactory(type)],
  });
}
