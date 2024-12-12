import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ require: true })
  title: string;

  @Prop({ type: [String] })
  genres: string[];

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
  author: Types.ObjectId;

  @Prop({ default: new Date() })
  createAt: Date;
}

export const BooksSchema = SchemaFactory.createForClass(Book);
