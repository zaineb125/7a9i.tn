import { UsersService } from 'src/users/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authLawyerSignUpDto } from './dto/authLawyerSignUp.dto';
import * as bcrypt from "bcrypt";
import { UnconfirmException } from './exceptions/confirm.exception';
import { RequiredException } from './exceptions/Required.exception';
import { authLawyerSignInDto } from './dto/authLawyerSignIn.dto';

const users=[
    {
        "id":"2",
        "email":"ilef@gmail.com",
        "password":"$2b$10$dXdfFq.Ig9EmUkk70HWgvudLP/fa9xniIqDd5tS5dU.IxXqxrpcmC",
        "type":"lawyer"
     
     }
 ] 

@Injectable()
export class AuthLawyerService {

    constructor(private jwtService:JwtService,private usersService: UsersService){}

    
    async signIn(dto:authLawyerSignInDto){
        
        if(!dto.password || !dto.email) throw new RequiredException();
        
        const user =await this.usersService.findUserByEmail(dto.email,users)
      
        const mdp =await bcrypt.compare(dto.password, user.password);
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
        return this.signLawyer(dto.email) ;
    }
    
    async signUp(dto:authLawyerSignUpDto){
        if(dto.confirmPassword === dto.password){
            dto.salt = await bcrypt.genSalt();
            dto.password = await bcrypt.hash (dto.password, dto.salt);
            dto.confirmPassword = undefined;
            users.push({...dto});
            return users;
        }
        else {
           throw new UnconfirmException();
        }
    }

    async signLawyer(email:string){
        return this.jwtService.sign({
            sub:"lawyert" ,
            email
        });
    }

    async verifyLawyer(token:any){
      
        return await this.usersService.findUserByEmail(token.email,users)
        
    }

}
