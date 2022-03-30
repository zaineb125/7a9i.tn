import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { AuthClientService } from './auth-client.service';
import { Body, Controller, Post, Response, UseGuards} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';


@Controller("authclient")
export class AuthClientController {
    constructor(private authClientService:AuthClientService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("signin")
    async signIn(@Body() dto:authClientSignInDto,@Response() response){
     
        const token = this.authClientService.signIn(dto)
    
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  
    }

    @Post("signup")
    async signUp(@Body() dto:authClientSignUpDto,@Response() response){
        const token = this.authClientService.signUp(dto) 
       
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
    }
}