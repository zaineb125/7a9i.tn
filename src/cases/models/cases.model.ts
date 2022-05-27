import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CasesStatusEnum } from '../enums/cases-status.enum';

export type CasesDocument = Cases & Document;
@Schema()
export class Cases extends mongoose.Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  idClient: string;
  @Prop({ required: true })
  idLawyer: string;
  @Prop({ required: true })
  etat: CasesStatusEnum;
  @Prop({ required: true })
  description: string;
  todos: string[];
}
export const CasesSchema = SchemaFactory.createForClass(Cases);
