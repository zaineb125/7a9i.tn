import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Double } from 'typeorm';

export type AuthLawyerDocument = AuthLawyer & Document;

@Schema()
export class AuthLawyer extends mongoose.Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  FamilyName: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  speciality: string;
  description: string;
  @Prop({ required: true, IsEmail: true })
  email: string;
  salt: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  confirmPassword: string;
  @Prop({ required: true })
  type: string;
  @Prop()
  jwt: string;
  @Prop()
  image: string;
  @Prop({ type: String })
  rating = '0';
  @Prop()
  phoneNumber: number;
}
export const AuthLawyerSchema = SchemaFactory.createForClass(AuthLawyer);
