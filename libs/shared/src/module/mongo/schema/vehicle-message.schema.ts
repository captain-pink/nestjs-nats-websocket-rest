import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleMessageDocument = VehicleMessage & Document;

@Schema()
export class VehicleMessage {
  @Prop()
  time: Date;

  @Prop()
  energy: number;

  @Prop()
  gps: Array<string>;

  @Prop()
  odo: number;

  @Prop()
  speed: number;

  @Prop()
  soc: number;
}

export const VehicleMessageSchema =
  SchemaFactory.createForClass(VehicleMessage);
