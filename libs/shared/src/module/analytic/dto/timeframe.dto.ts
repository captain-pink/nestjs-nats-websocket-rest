import { IsNumber } from 'class-validator';

export class TimeframeDto {
  @IsNumber()
  start: number;

  @IsNumber()
  end: number;
}
