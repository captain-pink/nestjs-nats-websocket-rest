import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { makeNestConfigModule } from './helper';
import { ConfigModuleOptions } from './type';

@Module({})
export class ConfigModule {
  static registerAsync(options: ConfigModuleOptions): DynamicModule {
    const nestConfigModule = makeNestConfigModule(options);

    return {
      module: ConfigModule,
      imports: [nestConfigModule],
      providers: [ConfigService],
    };
  }
}
