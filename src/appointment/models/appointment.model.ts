import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment extends mongoose.Document {
  @Prop({ required: true, IsEmail: true })
  lawyerEmail: string;

  @Prop({ required: true, IsEmail: true })
  clientEmail: string;

  @Prop()
  date: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  status: string;

  @Prop()
  todos: string[];

  @Prop()
  isRated: boolean = false;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
