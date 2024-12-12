import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(data: Partial<Book>): Promise<Book> {
    const newBook = new this.bookModel(data);
    return newBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<Book | null> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: Types.ObjectId, data: Partial<Book>): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: Types.ObjectId): Promise<Book | null> {
    const deletedBook = await this.bookModel.findById(id);

    await this.bookModel.findByIdAndDelete(id).exec();
    return deletedBook;
  }
}
