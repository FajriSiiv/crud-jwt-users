import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.body;

    if (!userId) {
      throw new ForbiddenException('Userid tidak sesuai');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new ForbiddenException('User tidak ditemukan');
    }

    if (user.roles !== 'admin') {
      throw new ForbiddenException('Hanya admin yang bisa membuat posts');
    }

    return true;
  }
}
