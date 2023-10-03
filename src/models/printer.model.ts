import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrinterDocument = Printer & Document;

@Schema()
export class Printer {
  @Prop()
  id: string;

  @Prop()
  brand: string;

  @Prop()
  manufacturer: string;

  @Prop()
  model: string;

  @Prop()
  description: string;

  @Prop()
  buildingName: string;

  @Prop()
  roomNumber: string;
}

export const PrinterSchema = SchemaFactory.createForClass(Printer);
