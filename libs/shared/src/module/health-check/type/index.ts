import { Transport } from '@nestjs/microservices';
import { HealthCheckResult } from '@nestjs/terminus';
import { HealthCheckType } from '../enum';

export interface HealthCheckServiceInterface {
  check: () => Promise<HealthCheckResult>;
}

export type HealthCheckOptions =
  | HttpHealthCheckOptions
  | MicroserviceHealthCheckOptions;

export type CommonHealthCheckOptions = { name: string };

export type MicroserviceHealthCheckOptions = CommonHealthCheckOptions & {
  transport: Transport;
  options: { host: string; port: number };
};

export type HttpHealthCheckOptions = CommonHealthCheckOptions & {
  url: string;
};

export type HealthCheckModuleOptions = {
  type: HealthCheckType;
  options: HealthCheckOptions;
};
