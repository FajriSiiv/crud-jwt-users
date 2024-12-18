import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { TokenBlacklistService } from './token-blacklist.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenBlacklistService],
  imports: [
    JwtModule.register({ secret: '12345', signOptions: { expiresIn: '60m' } }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AuthModule {}
