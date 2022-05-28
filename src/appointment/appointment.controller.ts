import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppointmentDto } from './dto/appointment.dto';
import { Response ,Request } from 'express';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
   constructor(private appointmentService:AppointmentService){}
    
    @Post("book")
    async book(@Body() dto:AppointmentDto,@Res({ passthrough: true }) response: Response) {
      return await this.appointmentService.addAppointment(dto) ;
    }

    @Post('demand')
    getAppointmentDemand(@Body()email:string) {
      return this.appointmentService.getAppointmentDemand(email);
    }

    @Post('progress')
    getAppointmentProgress(@Body()email:string) {
      return this.appointmentService.getAppointmentProgress(email);
    }

    @Post('complete')
    getAppointmentComplete(@Body()email:string) {
      return this.appointmentService.getAppointmentComplete(email);
    }

    
      
}
