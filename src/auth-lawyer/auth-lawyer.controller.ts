import { authLawyerSignUpDto } from './dto/authLawyerSignUp.dto';
import { authLawyerSignInDto } from './dto/authLawyerSignIn.dto';
import { AuthLawyerService } from './auth-lawyer.service';
import { Body, Controller, Post, Response, UseGuards} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Controller('auth-lawyer')
export class AuthLawyerController {
    constructor(private authLawyerService:AuthLawyerService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("signin")
    async signIn(@Body() dto:authLawyerSignInDto,@Response() response){
     
        const token = this.authLawyerService.signIn(dto)
    
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  
    }

    @Post("signup")
    async signUp(@Body() dto:authLawyerSignUpDto,@Response() response){
        const token = this.authLawyerService.signUp(dto) 
       
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true }); 
    }
}
