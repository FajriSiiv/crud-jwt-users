import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '../schemas/book.schema';
import { ObjectId, Types } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() data: Partial<Book>) {
    return this.booksService.create(data);
  }

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId) {
    const book = await this.booksService.findOne(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: Types.ObjectId,
    @Body() data: Partial<Book>,
  ) {
    const updatedBook = await this.booksService.update(id, data);

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return { updatedBook, message: 'Berhasil di update' };
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId) {
    const deletedBook = await this.booksService.remove(id);

    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return { deletedBook, message: 'Buku berhasil dihapus' };
  }
}
