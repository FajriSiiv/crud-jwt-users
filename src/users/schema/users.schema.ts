import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  name: string;

  @Prop({ type: String, enum: ['admin', 'user'], default: 'user' })
  roles: 'admin' | 'user';
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
