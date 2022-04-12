import { Model } from 'mongoose';
import { Injectable,UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authLawyerSignUpDto } from './dto/authLawyerSignUp.dto';
import * as bcrypt from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { AuthLawyer, AuthLawyerDocument } from './models/auth-lawyer.model';
import { authLawyerSignInDto } from './dto/authLawyerSignIn.dto';
import { RequiredException } from './exceptions/Required.exception';
import { UnconfirmException } from './exceptions/confirm.exception';
import { ExistingEmailException } from 'src/auth-client/exceptions/ExistingEmail.exception';


@Injectable()
export class AuthLawyerService {
    constructor(@InjectModel("authLawyer") private authLawyerModel: Model<AuthLawyerDocument>,private jwtService:JwtService){}
    
    async insertLawyer(createAuthLawyerDto:any): Promise<AuthLawyer>{
        
        const createdLawyer =new this.authLawyerModel(createAuthLawyerDto);
       
        return await createdLawyer.save();
    }

    async getLawyers(){
        const lawyers =await this.authLawyerModel.find().exec();
        return lawyers ;
    }


    async findLawyerByEmail(email:string):Promise<AuthLawyer>{
        
        const lawyer =await this.authLawyerModel.findOne({"email":email});
        if(lawyer){
            return lawyer ;
        }
    }

    async updateLawyerByJWT(dto:authLawyerSignInDto,jwt:string){
  
        const updatedLawyer =await this.findLawyerByEmail(dto.email);
        
        updatedLawyer.jwt=jwt;
       
        return updatedLawyer.save();
    }
    
    async signInLawyer(dto:authLawyerSignInDto){
        if(!dto.password || !dto.email) throw new RequiredException();
        
        const lawyer =await this.findLawyerByEmail(dto.email);
        
        const mdp =await bcrypt.compare(dto.password,lawyer.password);
       
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
        
        return this.updateLawyerByJWT(dto,await this.signLawyer(dto.email, "Lawyer"));
  
    }

    
     async signUpLawyer(dto:authLawyerSignUpDto){
        
        const lawyer = await this.findLawyerByEmail(dto.email);
       
        if(!lawyer){
            if(dto.confirmPassword === dto.password){
                dto.salt = await bcrypt.genSalt();
                dto.password = await bcrypt.hash (dto.password, dto.salt);
                dto.confirmPassword = await bcrypt.hash (dto.password, dto.salt);
                dto.jwt=await this.signLawyer(dto.email,"lawyer");
                return this.insertLawyer(dto)
            }
            else {
               throw new UnconfirmException();
            }
        }
        else{
            throw new ExistingEmailException()
        }
    }
    
   

    async signLawyer(email:string ,sub:string){
        return this.jwtService.sign({
            sub:sub ,
            email
        });
    }

   async verifyLawyer(token:any){
      
       return await this.findLawyerByEmail(token.email)
        
    }

}
