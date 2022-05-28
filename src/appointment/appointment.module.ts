import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment, AppointmentSchema } from './models/appointment.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Appointment",schema:AppointmentSchema}]),
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  
})
export class AppointmentModule {}
