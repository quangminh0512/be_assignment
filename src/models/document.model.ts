import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocModal = Doc & Document;

@Schema()
export class Doc {
  @Prop()
  studentId: string;

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
