import { Module } from '@nestjs/common';
import {
  MongoModule,
  VehicleMessage,
  VehicleMessageSchema,
} from '@vehicle-observer/shared';

import { LoaderController } from './loader.controller';

@Module({
  imports: [
    MongoModule.forFeature([
      { name: VehicleMessage.name, schema: VehicleMessageSchema },
    ]),
  ],
  controllers: [LoaderController],
})
export class LoaderModule {}
