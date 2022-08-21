import { IsString } from '@nestjs/class-validator';

export class FindVehicleByIdDto {
  @IsString()
  id: string;
}
