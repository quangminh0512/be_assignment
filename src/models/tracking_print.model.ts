import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Printer } from './printer.model';
import { User } from './user.model';

export type TrackingPrintDocument = TrackingPrint & Document;

@Schema()
export class TrackingPrint {
  @Prop()
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Printer' })
  printerId: Printer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  documentId: string;

  @Prop()
  type: string;

  @Prop()
  content: string;

  @Prop({ default: 0 })
  pages: number;

  @Prop()
  paperType: string;

  @Prop({ default: 0 })
  copies: number;

  @Prop({ default: +new Date() })
  time_started: Date;

  @Prop()
  time_end: Date;

  @Prop()
  date: Date;
}

export const TrackingPrintSchema = SchemaFactory.createForClass(TrackingPrint);
