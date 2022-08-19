import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

import { InjectHealthCheck } from './token';
import { HealthCheckServiceInterface } from './type';

@Controller('health')
export class HealthCheckController {
  constructor(
    @InjectHealthCheck()
    private readonly healthCheckService: HealthCheckServiceInterface,
  ) {
    console.log('here..12', this.healthCheckService.check);
  }

  @Get()
  @HealthCheck()
  async check() {
    console.log('here..323', this.healthCheckService);
    return this.healthCheckService.check();
  }
}
