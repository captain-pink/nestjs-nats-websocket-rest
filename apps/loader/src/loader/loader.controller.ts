import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { VehicleMessage } from '@vehicle-observer/shared';

@Controller()
export class LoaderController {
  @MessagePattern('vehicle.*')
  getNotifications(
    @Payload() data: VehicleMessage[],
    @Ctx() context: NatsContext,
  ) {
    console.log(`Subject: ${context.getSubject()}`);
    console.log(`Data: ${data}`);
  }
}
