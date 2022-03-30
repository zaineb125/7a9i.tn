import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authLawyerSignUpDto } from './dto/authLawyerSignUp.dto';
import { authLawyerSignInDto } from './dto/authLawyerSignIn.dto';
import { AuthUserService } from 'src/auth-user/auth-user.service';


const users=require("../user.json")

@Injectable()
export class AuthLawyerService {

    constructor(private authUserService:AuthUserService,private jwtService:JwtService ){}

    
    async signIn(dto:authLawyerSignInDto){
       
        return this.authUserService.signIn(dto,users,"lawyer",this.jwtService);
    }
    
    async signUp(dto:authLawyerSignUpDto){
        return this.authUserService.signIn(dto,users,"lawyer",this.jwtService);
    }

    async signLawyer(email:string){
        return this.authUserService.signUser(email,"lawyer",this.jwtService) ;
    }

    async verifyLawyer(token:any){
      
        return await this.authUserService.findUserByEmail(token.email,users)
        
    }

}
