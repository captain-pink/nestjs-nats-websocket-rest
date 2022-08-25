import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  FailedMessage,
  VehicleMessage,
  VehicleMessageDao,
} from '@vehicle-observer/shared';
import { VehicleMessageDto, FailedMessageDao } from '@vehicle-observer/shared';
import { TimeframeDto } from '@vehicle-observer/shared/module/analytic/dto/timeframe.dto';
import { validateOrReject, ValidationError } from 'class-validator';

import { Subject } from '../ws/enum';

@Injectable({})
export class LoaderService {
  private readonly logger = new Logger(LoaderService.name);

  constructor(
    private readonly vehicleDao: VehicleMessageDao,
    private readonly failedDao: FailedMessageDao,
  ) {}

  /**
   * TODO: message should be generic.
   * Logic should be moved to separate subject-specific service.
   * Chain of responsibility or pattern can be used.
   * @param message data received from nats
   * @returns created model
   */
  async saveMessage(
    message: VehicleMessageDto,
  ): Promise<[string, VehicleMessage | FailedMessage]> {
    try {
      await validateOrReject(message);

      return [Subject[Subject.VEHICLES], await this.vehicleDao.save(message)];
    } catch (error) {
      this.logger.error(JSON.stringify(error));

      return [Subject[Subject.FAILED], await this.reportFailedMessage(error)];
    }
  }

  /**
   * TODO:
   * - message type should be adjusted
   * - message type should be generic. Interfaces should be used
   * @param message failed message to save and notify
   */
  async reportFailedMessage(message: ValidationError) {
    return this.failedDao.save(message);
  }

  async loadDataFrame({
    start,
    end,
  }: TimeframeDto): Promise<NotFoundException | Array<VehicleMessage>> {
    return this.vehicleDao.findByPeriod(start, end);
  }
}
