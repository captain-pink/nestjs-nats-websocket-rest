import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

import { InjectHealthCheck } from './token';
import { HealthCheckServiceInterface } from './type';

@Controller('health')
export class HealthCheckController {
  constructor(
    @InjectHealthCheck()
    private readonly healthCheckService: HealthCheckServiceInterface,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.healthCheckService.check();
  }
}
