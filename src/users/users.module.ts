import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from 'src/auth/token-blacklist.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService, TokenBlacklistService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
