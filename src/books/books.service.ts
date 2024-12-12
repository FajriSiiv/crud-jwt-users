import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '../schemas/book.schema';
import { Model, Types } from 'mongoose';
import { Author, AuthorDocument } from 'src/schemas/author.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(data: Partial<Book>): Promise<Book> {
    const authorExists = await this.authorModel.findById(data.author).exec();
    if (!authorExists) {
      throw new NotFoundException(`Author with ID ${data.author} not found`);
    }

    const newBook = new this.bookModel(data);
    return newBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().populate('author', 'name bio').exec();
  }

  async findOne(id: Types.ObjectId): Promise<Book | null> {
    const book = await this.bookModel
      .findById(id)
      .populate('author', 'name bio')
      .exec();

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
