import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BooksSchema } from '../schemas/book.schema';
import { Author, AuthorSchema } from 'src/schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BooksSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
