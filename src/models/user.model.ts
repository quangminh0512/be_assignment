import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../user/entities/user.entities';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  studentId: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  class: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 0 })
  pages: number;

  @Prop()
  accessToken: string;

  @Prop({ default: Role.User })
  role: Role;

  @Prop({ default: +new Date() })
  createdAt: Date;

  @Prop({ default: +new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
