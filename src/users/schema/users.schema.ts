import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: ['admin', 'user'], default: 'user' })
  roles: 'admin' | 'user';
}

export const UserSchema = SchemaFactory.createForClass(User);
