import { IsString, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['admin', 'user'])
  roles: 'admin' | 'user';
}
