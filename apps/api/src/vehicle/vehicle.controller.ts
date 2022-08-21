import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import {
  FindVehicleByIdDto,
  FindVehicleMessageDto,
  VehicleMessageDao,
} from '@vehicle-observer/shared';

/**
 * TODO: To add service between Dao and controller
 * once logic becomes more complex
 */
@Controller('/vehicles')
export class VehicleController {
  private readonly logger = new Logger(VehicleController.name);

  constructor(private readonly vehiclesDao: VehicleMessageDao) {}

  @Get()
  find(@Query() query: FindVehicleMessageDto) {
    this.logger.log(`find: ${JSON.stringify(query)}`);

    return this.vehiclesDao.find(query);
  }

  @Get('/:id')
  findById(@Param() { id }: FindVehicleByIdDto) {
    this.logger.log(`findById: ${id}`);

    return this.vehiclesDao.findById(id);
  }
}
