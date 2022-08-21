import { Module } from '@nestjs/common';

import { MongoModule } from '../../mongo.module';
import { FailedMessageDao } from './failed-message.dao';
import {
  FailedMessage,
  FailedMessageSchema,
} from './schema/failed-message.schema';

@Module({
  imports: [
    MongoModule.forFeature([
      { name: FailedMessage.name, schema: FailedMessageSchema },
    ]),
  ],
  providers: [FailedMessageDao],
  exports: [FailedMessageDao],
})
export class FailedMessageModule {}
