import { AuthUserService } from './../auth-user/auth-user.service';
import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authClientSignUpDto } from './dto/authClientSignUp.dto';
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
    constructor(private authUserService:AuthUserService,private jwtService:JwtService  ){}

    
    async signIn(dto:authClientSignInDto){
        
        return this.authUserService.signIn(dto,users,"client",this.jwtService);
    }
    
    async signUp(dto:authClientSignUpDto){
      return this.authUserService.signUp(dto,users,"client",this.jwtService);  
    }

    async signClient(email:string){
        return this.authUserService.signUser(email,"client",this.jwtService) ;
    }

    async verifyClient(token:any){
      console.log("1")
        return await this.authUserService.findUserByEmail(token.email,users)
        
    }


}
