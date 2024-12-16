import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import { Posts } from '../schema/posts.schema';

@Injectable()
export class UserPost implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Posts.name) private postModel: Model<Posts>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.body;
    const { id }: { id: string } = request.params;

    const postUserId = await this.postModel.findById(new Types.ObjectId(id));

    if (!postUserId || postUserId.user.toString() !== userId) {
      throw new ForbiddenException(
        'Hanya pemilik yang bisa mengubah/menghapus posts',
      );
    }

    return true;
  }
}
