import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrackingPrintDocument = TrackingPrint & Document;

@Schema()
export class TrackingPrint {
  @Prop()
  id: string;

  @Prop()
  printerId: string;

  @Prop()
  userId: string;

  @Prop()
  documentId: string;

  @Prop()
  type: string;

  @Prop()
  content: string;

  @Prop()
  pages: string;

  @Prop()
  paperType: string;

  @Prop()
  copies: string;

  @Prop()
  time_started: string;

  @Prop()
  time_end: string;
}

export const TrackingPrintSchema = SchemaFactory.createForClass(TrackingPrint);
