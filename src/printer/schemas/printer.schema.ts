import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Printer {
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
