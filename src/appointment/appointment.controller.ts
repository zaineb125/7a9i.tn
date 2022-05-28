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

    @Get('demand/:email')
    getAppointmentDemand(@Param("email") email:any,@Res({ passthrough: true }) res: Response) {
      return this.appointmentService.getAppointmentDemand(email);
    }

    @Get('progress/:email')
    getAppointmentProgress(@Param("email") email:any,@Res({ passthrough: true }) res: Response) {
      return this.appointmentService.getAppointmentProgress(email);
    }

    @Get('complete/:email')
    getAppointmentComplete(@Param("email") email:any,@Res({ passthrough: true }) res: Response) {
      return this.appointmentService.getAppointmentComplete(email);
    }

    @Get('appointments/:email')
    getAppointments(@Param("email") email:any,@Res({ passthrough: true }) res: Response) {
      return this.appointmentService.getAppointments(email);
    }

    
      
}
