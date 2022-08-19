import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthCheckController } from './health-check.controller';
import { chooseHealthCheckServiceStrategy } from './health-check-service.strategy';
import { INJECTION_TOKEN_HEALTH_CHECK } from './token';
import { HealthCheckType } from './enum';

@Module({})
export class HealthCheckModule {
  /**
   * Method populates dynamic module
   * Logic relies on service type
   * @param type HealthCheckType
   * @returns Dynamic HealthCheckModule
   */
  static forRootAsync(type: HealthCheckType): DynamicModule {
    return {
      module: HealthCheckModule,
      imports: [TerminusModule, HttpModule],
      controllers: [HealthCheckController],
      providers: [
        {
          provide: INJECTION_TOKEN_HEALTH_CHECK,
          useClass: chooseHealthCheckServiceStrategy(type),
        },
      ],
    };
  }
}
