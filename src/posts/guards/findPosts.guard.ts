import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from '../schema/posts.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FindPost implements CanActivate {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { id }: { id: string } = request.params;

    const findPost = await this.postModel
      .findById(new Types.ObjectId(id))
      .exec();

    if (!findPost) {
      throw new HttpException('Tidak menemukan posts', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
