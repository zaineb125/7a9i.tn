import { Appointment, AppointmentDocument } from './models/appointment.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAppointmentDTO } from './dto/updateAppointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async addAppointment(AppointmentDto: any) {
    const createdAppointment = new this.appointmentModel(AppointmentDto);

    return await createdAppointment.save();
  }

  async getAppointmentDemand(email: any) {
    const appointments = await this.appointmentModel.find({
      lawyerEmail: email,
      status: 'demande',
    });
    if (appointments) {
      return appointments;
    }
  }

  async getAppointmentProgress(email: any) {
    return await this.appointmentModel.find({
      lawyerEmail: email,
      status: 'en cours',
    });
  }

  async getClientAppointmentProgress(email: any) {
    return await this.appointmentModel.find({
      clientEmail: email,
      status: 'en cours',
    });
  }

  async getClientAppointmentComplete(email: any) {
    return await this.appointmentModel.find({
      clientEmail: email,
      status: 'terminée',
      isRated: false ,
    });
  }

  async getAppointmentComplete(email: any) {
    return await this.appointmentModel.find({
      lawyerEmail: email,
      status: 'terminée',
    });
  }

  async getAppointmentById(id: any) {
    const appointment = await this.appointmentModel.findOne({ _id: id });
    if (appointment) {
      return appointment;
    }
  }

  async deleteApointById(id: any) {
    await this.appointmentModel.deleteOne({ _id: id });
  }

  async updateRated(id : any) {
    const appointment = await this.getAppointmentById(id);

    appointment.isRated = true ;
    return appointment.save() ;
  }

  async updateAppointment(id: any, dto: UpdateAppointmentDTO) {
    const appointment = await this.getAppointmentById(id);
    if (dto.description) {
      appointment.description = dto.description;
    }
    if (dto.todos) {
      appointment.todos = dto.todos;
    }
    if (dto.status) {
      appointment.status = dto.status;
    }
    if (dto.date) {
      appointment.date = dto.date;
    }
    return appointment.save();
  }
}