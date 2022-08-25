import { forwardRef, Module } from '@nestjs/common';
import {
  FailedMessageModule,
  VehicleMessageModule,
} from '@vehicle-observer/shared';
import { WsModule } from '../ws/ws.module';

import { LoaderController } from './loader.controller';
import { LoaderService } from './loader.service';

@Module({
  imports: [
    VehicleMessageModule,
    FailedMessageModule,
    forwardRef(() => WsModule),
  ],
  controllers: [LoaderController],
  providers: [LoaderService],
  exports: [LoaderService],
})
export class LoaderModule {}
