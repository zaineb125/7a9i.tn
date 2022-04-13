import { authLawyerSignUpDto } from './dto/authLawyerSignUp.dto';
import { authLawyerSignInDto } from './dto/authLawyerSignIn.dto';
import { AuthLawyerService } from './auth-lawyer.service';
import { Body, Controller, Post,UseGuards,Res} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth-lawyer')
export class AuthLawyerController {
    constructor(private authLawyerService:AuthLawyerService){}

   
    @Post("signin")
    async signIn(@Body() dto:authLawyerSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = this.authLawyerService.signInLawyer(dto)
    
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  
    }

    

    @Post("signup")
    async signUp(@Body() dto:authLawyerSignUpDto,@Res({ passthrough: true }) response: Response){
        const token = this.authLawyerService.signUpLawyer(dto) 
       
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true }); 
    }
}