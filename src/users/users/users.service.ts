import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
   
    
        findUserByEmail(email:string,user:any){
 
          const utilisateur=user.find((_user)=> _user.email===email);
          if(!utilisateur) {
            throw new UnauthorizedException('Credentials incorrect')
          }
          else {
            return utilisateur
        }
        }
}
