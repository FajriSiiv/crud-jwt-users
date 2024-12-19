import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Events {
  @Prop({ required: true, minlength: 5, maxlength: 100 })
  title: string;

  @Prop({ required: true, type: [{ type: Types.ObjectId }], ref: 'User' })
  users: Types.Array<Types.ObjectId>;

  @Prop({ required: true })
  date: string;
}

export type EventDocument = HydratedDocument<Events>;

export const EventSchema = SchemaFactory.createForClass(Events);
