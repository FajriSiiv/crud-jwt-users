import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FindEvent } from 'src/guards/guards.findEvent';
import { RolesCheck } from 'src/guards/guards.roles';

@Controller('event')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(RolesCheck)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(new Types.ObjectId(id));
  }

  @Patch('/addUser/:id')
  @UseGuards(FindEvent)
  @UseGuards(RolesCheck)
  async addUserToEvent(
    @Param('id') id: string,
    @Body() addUserToEventDto: { userId: string },
  ) {
    const { userId } = addUserToEventDto;
    const event = await this.eventService.addUserToEvent(id, userId);

    // if (!event) {
    //   throw new NotFoundException('Event tidak ditemukan');
    // }

    return event;
  }

  @Patch(':id')
  @UseGuards(RolesCheck)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(new Types.ObjectId(id), updateEventDto);
  }

  @Delete(':id')
  @UseGuards(RolesCheck)
  remove(@Param('id') id: string) {
    return this.eventService.remove(new Types.ObjectId(id));
  }
}
