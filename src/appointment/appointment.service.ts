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

    async getAppointmentDemand(email:any){
        return await this.appointmentModel.find({lawyerEmail
            :email,status:"demand"});
    }

    async getAppointmentProgress(email:any){
        return await this.appointmentModel.find({lawyerEmail
            :email,status:"progress"});
    }

    async getAppointmentComplete(email:any){
        return await this.appointmentModel.find({lawyerEmail
            :email,status:"complete"});
    }
}
