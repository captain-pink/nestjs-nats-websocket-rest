import { Injectable, Logger, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  MicroserviceHealthIndicatorOptions,
} from '@nestjs/terminus';
import {
  CommonConfig,
  INJECTION_TOKEN_CONFIG,
  LoaderConfig,
  LoaderOptions,
} from '../config';

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
  private readonly logger = new Logger(MicroserviceHealthCheckService.name);
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
    const { name, port, host, protocol, transport } = this.config;
    const loaderOptions = new LoaderOptions({
      port,
      host,
      protocol,
      transport,
    }).asMicroserviceOptions() as MicroserviceHealthIndicatorOptions;

    this.logger.log(`Health check: ${name}, ${JSON.stringify(loaderOptions)}`);

    return this.healthCheckService.check([
      () => this.http.pingCheck(name, loaderOptions),
    ]);
  }
}

@Injectable()
class HttpHealthCheckService implements HealthCheckServiceInterface {
  private readonly logger = new Logger(HttpHealthCheckService.name);
  private readonly config: CommonConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpHealthIndicator,
    private readonly healthCheckService: HealthCheckService,
  ) {
    this.config = this.configService.get(
      INJECTION_TOKEN_CONFIG,
    ) as CommonConfig;
  }

  check() {
    const {
      api: { name },
      mongo: { host, port, protocol },
    } = this.config;

    this.logger.log(`Health check: ${name}, ${host}, ${port}, ${protocol}`);

    return this.healthCheckService.check([
      () => this.http.pingCheck(name, `${protocol}://${host}:${port}`),
    ]);
  }
}
