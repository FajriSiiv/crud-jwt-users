import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  password: string;
}
