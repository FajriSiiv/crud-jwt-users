import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument, Events } from './schema/eventSchema.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Events.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const createEvent = new this.eventModel(createEventDto);

    return createEvent.save();
  }

  async addUserToEvent(eventId: string, userId: string) {
    const event = await this.eventModel.findById(new Types.ObjectId(eventId));
    // if (!event) {
    //   throw new HttpException('Event tidak ditemukan', HttpStatus.NOT_FOUND);
    // }

    if (!event.users.includes(new Types.ObjectId(userId))) {
      event.users.push(userId);
      await event.save();
    }

    return event;
  }

  async findAll(): Promise<Events[]> {
    const events = await this.eventModel.find().exec();

    return events;
  }

  async findOne(id: Types.ObjectId) {
    const event = await this.eventModel
      .findById(new Types.ObjectId(id))
      .populate('users')
      .exec();

    return event;
  }

  async update(id: Types.ObjectId, updateEventDto: UpdateEventDto) {
    await this.eventModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateEventDto,
    );

    const event = await this.eventModel.findById(new Types.ObjectId(id));

    return event;
  }

  async remove(id: Types.ObjectId) {
    await this.eventModel.findByIdAndDelete(new Types.ObjectId(id));

    return { message: 'Event berhasil di hapus' };
  }
}
