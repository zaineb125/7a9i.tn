import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type AuthClientDocument = AuthClient & Document;

@Schema()
export class AuthClient extends mongoose.Document{
   
    @Prop({required:true})
    name:string;
    @Prop({required:true})
    FamilyName:string;
    @Prop({required:true})
    age:number;
    @Prop({required:true})
    city:string;
    @Prop({required:true})
    problemType:string;
    Budget:string;
    @Prop({required:true,IsEmail:true})
    email:string;
    salt:string;
    @Prop({required:true})
    password:string;
    @Prop({required:true})
    confirmPassword:string;
    @Prop({required:true})
    type:string;
    @Prop()
    Comment:string;
    @Prop()
    jwt:string;

}
export const AuthClientSchema = SchemaFactory.createForClass(AuthClient);

 