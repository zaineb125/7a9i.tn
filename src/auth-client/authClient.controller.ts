import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { AuthClientService } from './auth-client.service';
import { Body, Controller, Get, Post, Response, Request,UseGuards, Res} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';


@Controller("auth-client")
export class AuthClientController {
    constructor(private authClientService:AuthClientService){}

   
    @Post("signin")
    async signIn(@Body() dto:authClientSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = await this.authClientService.signInClient(dto)
      
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });

    }

    @Get("signout")
    async signOut(@Request() req){
      console.log(req)
      const cookie =req.cookies ;
      console.log(cookie.token);
      
    }

    @Post("signup")
    async signUp(@Body() dto:authClientSignUpDto,@Res({ passthrough: true }) response: Response){
        const token = await this.authClientService.signUpClient(dto) 
       
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
    }
}