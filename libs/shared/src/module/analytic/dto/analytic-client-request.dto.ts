import { Type } from '@nestjs/class-transformer';
import { IsString } from '@nestjs/class-validator';
import { Timeframe } from '../type';
import { TimeframeDto } from './timeframe.dto';

export class AnalyticClientRequestDto<A> {
  @IsString()
  action: A;

  @Type(() => TimeframeDto)
  timeframe: Timeframe;
}
