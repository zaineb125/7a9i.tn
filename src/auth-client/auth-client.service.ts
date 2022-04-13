import { Model } from 'mongoose';
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthClient, AuthClientDocument } from 'src/auth-Client/models/auth-Client.model';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import * as bcrypt from "bcrypt";
import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { RequiredException } from './exceptions/Required.exception';
import { UnconfirmException } from './exceptions/confirm.exception';
import { ExistingEmailException } from './exceptions/ExistingEmail.exception';

@Injectable()
export class AuthClientService {
    constructor(@InjectModel("authClient") private authClientModel: Model<AuthClientDocument>,private jwtService:JwtService){}
    
    async insertClient(createAuthClientDto:any): Promise<AuthClient>{
        
        const createdClient =new this.authClientModel(createAuthClientDto);
       
        return await createdClient.save();
    }

    async getClients(){
        const Clients =await this.authClientModel.find().exec();
        return Clients ;
    }


    async findClientByEmail(email:string):Promise<AuthClient>{
        
        const Client =await this.authClientModel.findOne({"email":email});
        if(Client){
            return Client ;
        }
    }

    async findClientByJwt(jwt:string):Promise<AuthClient>{
        
        const Client =await this.authClientModel.findOne({"jwt":jwt});
        if(Client){
            return Client ;
        }
    }

    async updateClientByJWT(dto:authClientSignInDto,jwt:string){
  
        const updatedClient =await this.findClientByEmail(dto.email);
        
        updatedClient.jwt=jwt;
       
        return updatedClient.save();
    }
    
    async signInClient(dto:authClientSignInDto){
        
        if(!dto.password || !dto.email) throw new RequiredException();
        
        const Client =await this.findClientByEmail(dto.email);
        
        const mdp =await bcrypt.compare(dto.password,Client.password);
      
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
        
        const token =await this.signClient(dto.email, "Client")
       
        this.updateClientByJWT(dto,token);
        
        return token ;
  
    }

    
     async signUpClient(dto:authClientSignUpDto){
        
        const Client = await this.findClientByEmail(dto.email);
       
        if(!Client){
            if(dto.confirmPassword === dto.password){
                dto.salt = await bcrypt.genSalt();
                dto.password = await bcrypt.hash (dto.password, dto.salt);
                dto.confirmPassword = await bcrypt.hash (dto.password, dto.salt);
                const token = await this.signClient(dto.email,"Client");
                dto.jwt=token ;
                this.insertClient(dto) ;
                return token ;
            }
            else {
               throw new UnconfirmException();
            }
        }
        else{
            throw new ExistingEmailException()
        }
    }
    
   

    async signClient(email:string ,sub:string){
        return this.jwtService.sign({
            sub:sub ,
            email
        });
    }

   async signoutClient(jwt:string){
       const client =this.findClientByJwt(jwt);
       (await client).jwt="";
       console.log(client);
   }

   async verifyClient(token:any){
      
        return await this.findClientByEmail(token.email)
        
    }

}


