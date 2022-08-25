import { forwardRef, Module } from '@nestjs/common';

import { LoaderModule } from '../loader/loader.module';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [forwardRef(() => LoaderModule)],
  providers: [WsGateway],
  exports: [WsGateway],
})
export class WsModule {}
