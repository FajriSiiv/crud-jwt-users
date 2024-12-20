import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role harus "user" dan "admin"' })
  roles: string;
}
