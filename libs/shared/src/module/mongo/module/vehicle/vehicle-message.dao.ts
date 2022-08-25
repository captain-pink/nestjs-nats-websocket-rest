import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FindVehicleMessageDto, VehicleMessageDto } from './dto';
import { VehicleMessage, VehicleMessageDocument } from './schema';

@Injectable()
export class VehicleMessageDao {
  private readonly logger = new Logger(VehicleMessageDao.name);

  constructor(
    @InjectModel(VehicleMessage.name)
    private vehicleMessageModel: Model<VehicleMessageDocument>,
  ) {}

  save(message: VehicleMessageDto): Promise<VehicleMessage> {
    const model = new this.vehicleMessageModel(message);

    this.logger.debug(`Saving model: ${JSON.stringify(model)}`);

    return model.save();
  }

  /**
   * TODO:
   * - Error handling logic can be wrapped into decorator
   * or removed to HttpErrorInterceptor for more generic approach
   * @param args FindVehicleMessageDto
   * @returns Entity of Exception
   */
  async find(
    args: FindVehicleMessageDto,
  ): Promise<NotFoundException | Array<VehicleMessage>> {
    this.logger.log(
      `Searching for vehicle messages. Args: ${JSON.stringify(args)}`,
    );

    try {
      return await this.vehicleMessageModel
        .find({ published: true })
        .sort(args.sort)
        .skip(args.offset)
        .limit(args.limit);
    } catch (error) {
      const parsed = parseMongoValidationError(error);

      this.logger.error(`find: ${JSON.stringify(parsed)}`);

      return new NotFoundException(parsed);
    }
  }

  async count(): Promise<number | NotFoundException> {
    try {
      return await this.vehicleMessageModel.count();
    } catch (error) {
      this.logger.error(`count: ${JSON.stringify(error)}`);

      return new NotFoundException(error.message);
    }
  }

  /**
   * TODO:
   * - Error handling logic can be wrapped into decorator
   * or removed to HttpErrorInterceptor for more generic approach
   * @param id string
   * @returns Entity of Exception
   */
  async findById(id: string): Promise<NotFoundException | VehicleMessage> {
    this.logger.log(`Searching for vehicle message. Id: ${id}`);

    try {
      return await this.vehicleMessageModel.findById(id);
    } catch (error) {
      const parsed = parseMongoValidationError(error);

      this.logger.error(`find: ${JSON.stringify(parsed)}`);

      return new NotFoundException(parsed);
    }
  }

  async findByPeriod(
    start: number,
    end: number,
  ): Promise<NotFoundException | Array<VehicleMessage>> {
    try {
      return await this.vehicleMessageModel
        .find({
          time: {
            $gte: new Date(start),
            $lt: new Date(end),
          },
        })
        .lean();
    } catch (error) {
      const parsed = parseMongoValidationError(error);

      this.logger.error(`find: ${JSON.stringify(parsed)}`);

      return new NotFoundException(parsed);
    }
  }
}
/**
 * TODO:
 * - To add proper type for error
 * - To move error logic to HttpErrorInterceptor
 * @param param0 error object produced by mongoose
 * @returns parsed error
 */
function parseMongoValidationError({ name, status }: any) {
  return { name, status };
}
