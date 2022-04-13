import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { AuthClientService } from './auth-client.service';
import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Response ,Request } from 'express';



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

    @Get('signout')
    async logout(@Req()req:Request,@Res({ passthrough: true }) res: Response) {
      
      const token =req.cookies.access_token;
      
      this.authClientService.signoutClient(token);
      res.cookie('access_token', '', { expires: new Date() });
   
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