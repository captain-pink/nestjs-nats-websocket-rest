import { Transform } from '@nestjs/class-transformer';
import { IsString, IsNumber } from '@nestjs/class-validator';
import { pipe, prop, split } from 'ramda';

export class VehicleMessageDto {
  @IsString()
  primaryChannel: string;

  @IsString()
  uniqueChannel: string;

  @IsNumber()
  time: number;

  @IsNumber()
  energy: string;

  @IsString({ each: true })
  @Transform(pipe(prop('value'), split('|')))
  gps: Array<string>;

  @IsNumber()
  odo: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  soc: number;
}
