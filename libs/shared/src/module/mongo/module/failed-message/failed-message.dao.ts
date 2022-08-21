import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationError } from 'class-validator';
import { Model } from 'mongoose';

import { FailedMessage, FailedMessageDocument } from './schema';

@Injectable()
export class FailedMessageDao {
  private readonly logger = new Logger(FailedMessageDao.name);

  constructor(
    @InjectModel(FailedMessage.name)
    private vehicleMessageModel: Model<FailedMessageDocument>,
  ) {}

  /**
   * TODO: type should be adjusted
   * @param message failed message to save in db
   * @returns mongo model
   */
  async save(message: ValidationError): Promise<FailedMessage> {
    const model = new this.vehicleMessageModel(message);

    this.logger.debug(`Saving model: ${JSON.stringify(model)}`);

    return model.save();
  }
}
