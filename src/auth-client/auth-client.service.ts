import { UsersService } from 'src/users/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import * as bcrypt from "bcrypt";
import { UnconfirmException } from './exceptions/confirm.exception';
import { RequiredException } from './exceptions/Required.exception';
import { authClientSignInDto } from './dto/authClientSignIn.dto';



const users=[
    {
        "id":"1",
        "email":"zaineb@gmail.com",
        "password":"$2b$10$dXdfFq.Ig9EmUkk70HWgvudLP/fa9xniIqDd5tS5dU.IxXqxrpcmC",
        "type":"client"
     
     }
 ] 

@Injectable()
export class AuthClientService {
    constructor(private jwtService:JwtService,private usersService: UsersService){}

    
    async signIn(dto:authClientSignInDto){
        
        if(!dto.password || !dto.email) throw new RequiredException();
        
        const user =await this.usersService.findUserByEmail(dto.email,users)
      
        const mdp =await bcrypt.compare(dto.password, user.password);
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
        return this.signClient(dto.email) ;
    }
    
    async signUp(dto:authClientSignUpDto){
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

    async signClient(email:string){
        return this.jwtService.sign({
            sub:"client" ,
            email
        });
    }

    async verifyClient(token:any){
         
        return await this.usersService.findUserByEmail(token.email,users)
        
    }


}
