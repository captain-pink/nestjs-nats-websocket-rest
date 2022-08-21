import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidationError } from 'class-validator';
import { Document, Types } from 'mongoose';

export type FailedMessageDocument = FailedMessage & Document;

@Schema()
export class FailedMessage {
  @Prop({ type: Types.Map })
  report: ValidationError;
}

export const FailedMessageSchema = SchemaFactory.createForClass(FailedMessage);
