import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio?: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
