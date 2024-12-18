import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

@Schema()
export class Events {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: [{ type: Types.ObjectId }], ref: 'User' })
  users: Types.Array<Types.ObjectId>;
}

export type EventDocument = HydratedDocument<Events>;

export const EventSchema = SchemaFactory.createForClass(Events);
