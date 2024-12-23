import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model, Types } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class RolesCheck implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['access_token'];

    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_KEY,
    });
    const userToken: { _id: string } = decoded.user;

    // const { userId }: { userId: string } = request.body;

    // if (userId !== userToken._id) {
    //   throw new HttpException('User tidak sesuai', HttpStatus.NOT_FOUND);
    // }

    const userRole = await this.userModel.findById(
      new Types.ObjectId(userToken._id),
    );

    if (!userRole) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userRole.roles !== 'admin') {
      throw new HttpException('Kamu bukan admin', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
