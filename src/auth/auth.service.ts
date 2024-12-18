import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(name: string) {
    if (typeof name !== 'string') {
      throw new HttpException(
        'Name should be a string',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findOne({ name: name }).exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const payload = { user };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
