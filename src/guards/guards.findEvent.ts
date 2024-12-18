import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventDocument, Events } from 'src/event/schema/eventSchema.schema';

@Injectable()
export class FindEvent implements CanActivate {
  constructor(
    @InjectModel(Events.name) private eventModel: Model<EventDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { id }: { id: string } = request.params;

    const findEvent = await this.eventModel
      .findById(new Types.ObjectId(id))
      .exec();

    if (!findEvent) {
      throw new HttpException('Tidak menemukan event', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
