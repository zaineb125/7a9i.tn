import { PartialType, PickType } from '@nestjs/swagger';
import { AppointmentDto } from './appointment.dto';

export class UpdateAppointmentDTO extends PickType(AppointmentDto, [
  'status',
  'description',
  'todos',
  'date',
]) {}
