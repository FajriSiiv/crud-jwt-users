import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventSchema } from './schema/eventSchema.schema';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from 'src/auth/token-blacklist.service';

@Module({
  controllers: [EventController],
  providers: [EventService, JwtService, TokenBlacklistService],
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventSchema }]),
  ],
})
export class EventModule {}
