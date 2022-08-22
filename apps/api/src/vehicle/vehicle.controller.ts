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

  /**
   * TODO:
   * - Wrap paging logic into decorator
   * to use further with other requests;
   * - Describe generic return type;
   * @param query FindVehicleMessageDto
   * @returns reponse with vehicles and pagination
   */
  @Get()
  async find(@Query() query: FindVehicleMessageDto) {
    this.logger.log(`find:query: ${JSON.stringify(query)}`);

    const response = {
      data: await this.vehiclesDao.find(query),
      paging: {
        limit: query.limit,
        offset: query.offset,
        total: await this.vehiclesDao.count(),
      },
    };

    this.logger.debug(`find:response: ${JSON.stringify(response)}`);

    return response;
  }

  @Get('/:id')
  findById(@Param() { id }: FindVehicleByIdDto) {
    this.logger.log(`findById: ${id}`);

    return this.vehiclesDao.findById(id);
  }
}
