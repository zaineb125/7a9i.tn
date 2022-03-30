import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RequiredException } from "./exceptions/Required.exception";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UnconfirmException } from "./exceptions/confirm.exception";

@Injectable()
export class AuthUserService {
    

    
    findUserByEmail(email:string,user:any){
        console.log("2")
        const utilisateur=user.find((_user)=> _user.email===email);
        if(!utilisateur) {
          throw new UnauthorizedException('Credentials incorrect')
        }
        else {
          return utilisateur
      }
      }
   
    async signIn(dto:any,users:any,type:string,jwtService:JwtService){
        console.log("3")
        if(!dto.password || !dto.email) throw new RequiredException();
        
        const user =await this.findUserByEmail(dto.email,users)
      
        const mdp =await bcrypt.compare(dto.password, user.password);
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
        return this.signUser(dto.email,type,jwtService) ;
    }

    async signUp(dto:any,users:any,type:string,jwtService:JwtService){
        if(dto.confirmPassword === dto.password){
            dto.salt = await bcrypt.genSalt();
            dto.password = await bcrypt.hash (dto.password, dto.salt);
            dto.confirmPassword = undefined;
            users.push({...dto});
            return this.signUser(dto.email,type,jwtService);
        }
        else {
           throw new UnconfirmException();
        }
    }

    async signUser(email:string ,sub:string,jwtService:JwtService){
        return jwtService.sign({
            sub:sub ,
            email
        });
    }

}
