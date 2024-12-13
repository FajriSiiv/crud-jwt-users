import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly bio: string;

  @MinLength(6)
  readonly password: string;
}
