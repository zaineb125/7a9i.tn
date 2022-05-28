import { Appointment, AppointmentDocument } from './models/appointment.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel("Appointment") private appointmentModel: Model<AppointmentDocument>){}

    async addAppointment(AppointmentDto:any){
        
        const createdAppointment =new this.appointmentModel(AppointmentDto);
       
        return await createdAppointment.save();
    }

    /*async getAppointment(status:any){
        return await createdAppointment
    }*/
}
