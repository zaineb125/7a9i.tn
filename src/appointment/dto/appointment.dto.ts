
import {  IsEmail, IsNotEmpty} from "class-validator";

export  class AppointmentDto {
   
    
    @IsNotEmpty()
    @IsEmail()
    lawyerEmail:string;
    
    @IsNotEmpty()
    @IsEmail()
    clientEmail:string;
    
    
    date:Date;

    @IsNotEmpty()
    description:string;
    
    @IsNotEmpty()
    type:string;
    
  
   
   
}

