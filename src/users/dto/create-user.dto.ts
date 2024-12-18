import { IsIn, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role harus "user" dan "admin"' })
  roles: string;
}
