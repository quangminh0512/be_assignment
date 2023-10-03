import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
