import { Transform } from '@nestjs/class-transformer';
import { IsOptional } from '@nestjs/class-validator';
import { SortOrder } from 'mongoose';
import { pipe, prop } from 'ramda';

/**
 * Class represents FindVehicle arguments dto.
 * Should be extended with fields and validation
 */
export class FindVehicleMessageDto {
  @IsOptional()
  @Transform(pipe(prop('value'), (value: string) => parseInt(value, 10)))
  limit = 20;

  /**
   * TODO:
   * To add custom type with internal validation
   */
  sort: Record<string, SortOrder> = { date: -1 };

  @IsOptional()
  @Transform(pipe(prop('value'), (value: string) => parseInt(value, 10)))
  offset = 0;
}
