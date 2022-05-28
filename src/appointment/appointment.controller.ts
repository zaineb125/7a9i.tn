import { Body, Controller, Post, Res } from '@nestjs/common';
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

    
      
}
