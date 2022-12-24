import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AppointmentDto } from './dto/appointment.dto';
import { Response, Request } from 'express';
import { AppointmentService } from './appointment.service';
import { UpdateAppointmentDTO } from './dto/updateAppointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post('book')
  async book(
    @Body() dto: AppointmentDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.appointmentService.addAppointment(dto);
  }

  @Delete('delete/:id')
  deleteAppointment(@Param('id') id: any) {
    this.appointmentService.deleteApointById(id);
  }
  @Get('/:id')
  getAppointmentById(@Param('id') id: any) {
    return this.appointmentService.getAppointmentById(id);
  }
  @Get('demand/:email')
  getAppointmentDemand(
    @Param('email') email: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appointmentService.getAppointmentDemand(email);
  }

  @Get('progress/:email')
  getAppointmentProgress(
    @Param('email') email: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appointmentService.getAppointmentProgress(email);
  }

  @Get('progressClient/:email')
  getClientAppointmentProgress(
    @Param('email') email: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appointmentService.getClientAppointmentProgress(email);
  }

  @Get('completeClient/:email')
  getClientAppointmentComplete(
    @Param('email') email: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appointmentService.getClientAppointmentComplete(email);
  }

  @Get('complete/:email')
  getAppointmentComplete(
    @Param('email') email: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appointmentService.getAppointmentComplete(email);
  }

  @Patch('/update/:id')
  updateAppointment(
    @Param('id') id: string,
    @Body('') appointmentDto: UpdateAppointmentDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appointmentService.updateAppointment(id, appointmentDto);
  }

  @Patch('/rated/:id')
  updateRated(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.appointmentService.updateRated(id);
  }
}
