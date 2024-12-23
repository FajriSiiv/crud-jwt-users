import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    if (typeof createAuthDto.name !== 'string') {
      throw new HttpException(
        'Name should be a string',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel
      .findOne({ name: createAuthDto.name })
      .exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const comparePassword = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );

    if (!comparePassword) {
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
    }

    const payload = { user };

    const userRespond = {
      name: user.name,
      roles: user.roles,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      userRespond,
    };
  }

  async userMe(req: Request) {
    const token = req.cookies?.access_token;
    try {
      if (!token) {
        throw new Error('Token not found in cookies');
      }

      const secretKey = process.env.JWT_KEY;
      const decodedJWT = this.jwtService.verify(token, { secret: secretKey });
      const decoded = decodedJWT.user;

      return { id: decoded._id, user: decoded.name, roles: decoded.roles };
    } catch (error) {
      throw new Error('Invalid token or user not authenticated');
    }
  }
}
