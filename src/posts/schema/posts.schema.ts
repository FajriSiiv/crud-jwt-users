import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostsDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
