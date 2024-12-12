import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  genres: string[];

  @IsMongoId()
  author: string; // ID Penulis
}
