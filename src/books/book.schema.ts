import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ require: true })
  title: string;

  @Prop({ type: [String] })
  genres: string[];

  @Prop()
  status: string;

  @Prop({ default: new Date() })
  createAt: Date;
}

export const BooksSchema = SchemaFactory.createForClass(Book);
