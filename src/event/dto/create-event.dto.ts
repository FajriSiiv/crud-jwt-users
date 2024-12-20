import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  users: string[];

  @IsString()
  date: string;
}

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 3;
}
