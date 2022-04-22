import { authLawyerSignUpDto } from './dto/authLawyerSignUp.dto';
import { authLawyerSignInDto } from './dto/authLawyerSignIn.dto';
import { AuthLawyerService } from './auth-lawyer.service';
import { Body, Controller, Post,UseGuards,Res, Get, Req, Param} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Response ,Request } from 'express';

@Controller('auth-lawyer')
export class AuthLawyerController {
    constructor(private authLawyerService:AuthLawyerService){}

   
    @Post("signin")
    async signIn(@Body() dto:authLawyerSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = await this.authLawyerService.signInLawyer(dto)
  
        return {token:token}
  
    }

    @Get("lawyerInfo/:jwt")
    async getlawyerInfo(@Param("jwt")jwt:any){
      const lawyerInfo= this.authLawyerService.findLawyerByJwt(jwt);
      const lawyer = await lawyerInfo;
      return {
        "firstName": lawyer.name,
        "familyName": lawyer.FamilyName,
        "age": lawyer.age,
        "adress": lawyer.city,
        "email": lawyer.email,
        "speciality":lawyer.speciality,
        "description":lawyer.description
      };
    }

    @Get('signout')
    async logout(@Req()req:Request,@Res({ passthrough: true }) res: Response) {
      
      const token =req.cookies.access_token;
       
      this.authLawyerService.signoutLawyer(token);
     
      res.cookie('access_token', '', { expires: new Date() });
   
    }
    

    @Post("signup")
    async signUp(@Body() dto:authLawyerSignUpDto,@Res({ passthrough: true }) response: Response){
        const token =await this.authLawyerService.signUpLawyer(dto) 
       
        response        
        .cookie('access_token', token , {
        httpOnly: true,
        domain: 'localhost', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true }); 
    }
}