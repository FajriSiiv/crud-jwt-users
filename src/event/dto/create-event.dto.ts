import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
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
