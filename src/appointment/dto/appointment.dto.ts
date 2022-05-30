import { Optional } from '@nestjs/common';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  @Optional()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  lawyerEmail: string;

  @IsNotEmpty()
  @IsEmail()
  clientEmail: string;

  @Optional()
  date: Date;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  status: string;

  todos: string[];
}
