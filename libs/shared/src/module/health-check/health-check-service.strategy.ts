import { Injectable, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { ApiConfig, INJECTION_TOKEN_CONFIG, LoaderConfig } from '../config';

import { HealthCheckType } from './enum';
import { HealthCheckServiceInterface } from './type';

/**
 * Chooses strategy based on applicatoin type
 * @param type application type HealthCheckType
 * @returns service strategy
 */
export function chooseHealthCheckServiceStrategy(
  type: HealthCheckType,
): Type<HealthCheckServiceInterface> {
  if (type === HealthCheckType.API) {
    return HttpHealthCheckService;
  }

  if (type === HealthCheckType.MICROSERVICE) {
    return MicroserviceHealthCheckService;
  }

  throw new Error('Unknown application type');
}

@Injectable()
export class MicroserviceHealthCheckService
  implements HealthCheckServiceInterface
{
  private readonly config: LoaderConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: MicroserviceHealthIndicator,
    private readonly healthCheckService: HealthCheckService,
  ) {
    this.config = this.configService.get(INJECTION_TOKEN_CONFIG)
      .loader as LoaderConfig;
  }

  check() {
    const { name, ...options } = this.config;

    return this.healthCheckService.check([
      () =>
        this.http.pingCheck(name, {
          ...options,
          transport: parseInt(options.transport, 10),
        }),
    ]);
  }
}

@Injectable()
class HttpHealthCheckService implements HealthCheckServiceInterface {
  private readonly config: ApiConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpHealthIndicator,
    private readonly healthCheckService: HealthCheckService,
  ) {
    this.config = configService.get(INJECTION_TOKEN_CONFIG).api as ApiConfig;
  }

  check() {
    const { name, host, port } = this.config;

    return this.healthCheckService.check([
      () => this.http.pingCheck(name, `${host}:${port}`),
    ]);
  }
}
