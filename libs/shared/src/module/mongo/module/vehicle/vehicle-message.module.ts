import { Module } from '@nestjs/common';

import { MongoModule } from '../../mongo.module';
import { VehicleMessage, VehicleMessageSchema } from './schema';
import { VehicleMessageDao } from './vehicle-message.dao';

@Module({
  imports: [
    MongoModule.forFeature([
      { name: VehicleMessage.name, schema: VehicleMessageSchema },
    ]),
  ],
  providers: [VehicleMessageDao],
  exports: [VehicleMessageDao],
})
export class VehicleMessageModule {}
