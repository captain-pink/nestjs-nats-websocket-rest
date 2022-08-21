import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { SortOrder } from 'mongoose';

/**
 * Class represents FindVehicle arguments dto.
 * Should be extended with fields and validation
 */
export class FindVehicleMessageDto {
  @IsNotEmpty()
  @IsString()
  limit = 20;

  /**
   * TODO:
   * To add custom type with internal validation
   */
  sort: Record<string, SortOrder> = { date: -1 };
}
