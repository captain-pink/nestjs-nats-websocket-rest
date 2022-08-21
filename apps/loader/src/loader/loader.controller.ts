import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { plainToClass } from '@nestjs/class-transformer';
import { VehicleMessageDto } from '@vehicle-observer/shared';

import { LoaderService } from './loader.service';
import { WsGateway } from '../ws/ws.gateway';

@Controller()
export class LoaderController {
  private readonly logger = new Logger(LoaderController.name);

  constructor(
    private readonly loaderService: LoaderService,
    private readonly ws: WsGateway,
  ) {}

  /**
   * TODO: Wrap method into decorator:
   * - add validation pipe
   * - add vehicle serialization decorator
   * @param data VehicleMessageDto without subject
   * @param context NatsContext
   * @returns saved model
   */
  @MessagePattern('vehicle.*')
  async processVehicleMessage(
    @Payload() data: Partial<VehicleMessageDto>[],
    @Ctx() context: NatsContext,
  ) {
    const [primaryChannel, uniqueChannel] = context.getSubject().split('.');

    this.logger.log(`Process vehicle: ${uniqueChannel}`);

    const vehicle = plainToClass(VehicleMessageDto, {
      ...data,
      primaryChannel,
      uniqueChannel,
    });

    const message = await this.loaderService.saveMessage(vehicle);

    /**
     * TODO: To think about which model to send to subscribers.
     * May be it's better to remove private mongo fields and just send
     * clean model.
     */
    return this.ws.publish(...message);
  }
}
