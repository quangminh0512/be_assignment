import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.model';

export type DocModal = Doc & Document;

@Schema()
export class Doc {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  documentId: string;

  @Prop()
  fileName: string;

  @Prop()
  start_print: string;

  @Prop()
  end_print: string;

  @Prop()
  pages: string;
}

export const DocSchema = SchemaFactory.createForClass(Doc);
