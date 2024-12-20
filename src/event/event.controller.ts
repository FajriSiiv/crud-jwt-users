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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, PaginationQueryDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FindEvent } from 'src/guards/guards.findEvent';
import { RolesCheck } from 'src/guards/guards.roles';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('event')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(RolesCheck)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Nomor halaman untuk pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Jumlah item per halaman',
    example: 3,
  })
  findAll(@Query() query: PaginationQueryDto) {
    const { page = 1, limit = 3 } = query;

    return this.eventService.findAll(page, limit);
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
