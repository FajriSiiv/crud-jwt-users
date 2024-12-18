import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  users: string[];
}
