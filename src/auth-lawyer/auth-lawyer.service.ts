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
import { ExistingEmailException } from 'src/auth-lawyer/exceptions/ExistingEmail.exception';


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

    async findLawyerByJwt(jwt:string):Promise<AuthLawyer>{
      
        const lawyer =await this.authLawyerModel.findOne({"jwt":jwt});
   
        if(lawyer){
            return lawyer ;
        }
    }

    async updateLawyerByJWT(dto:authLawyerSignInDto,jwt:string){
  
        const updatedLawyer =await this.findLawyerByEmail(dto.email);
        
        updatedLawyer.jwt=jwt;
       
        return updatedLawyer.save();
    }

    async updateRating(email:string,rating:string){
  
        const updatedLawyer =await this.findLawyerByEmail(email);
        
        updatedLawyer.rating=rating;
       
        return updatedLawyer.save();
    }
    
    async updatePicture(jwt:string, imageName:string){
        const lawyer =await this.findLawyerByJwt(jwt); 
        lawyer.image="http://localhost:3000/auth-lawyer/"+imageName ;
        lawyer.save() ;
        return lawyer ;
    }

    async signInLawyer(dto:authLawyerSignInDto){
        
        if(!dto.password || !dto.email) throw new RequiredException();
        
        const lawyer =await this.findLawyerByEmail(dto.email);
        
        const mdp =await bcrypt.compare(dto.password,lawyer.password);
       
        if(!mdp) throw new UnauthorizedException('Credentials incorrect');
       
        const token =await this.signLawyer(dto.email, "lawyer")
       
        this.updateLawyerByJWT(dto,token);
        
        return token ;
    }

    
     async signUpLawyer(dto:authLawyerSignUpDto){
        
        const lawyer = await this.findLawyerByEmail(dto.email);
       
        if(!lawyer){
            if(dto.confirmPassword === dto.password){
                dto.salt = await bcrypt.genSalt();
                dto.password = await bcrypt.hash (dto.password, dto.salt);
                dto.confirmPassword = await bcrypt.hash (dto.password, dto.salt);
                const token = await this.signLawyer(dto.email,"lawyer");
                dto.jwt=token ;
                this.insertLawyer(dto) ;
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

    async signoutLawyer(jwt:string){
    
        const lawyer =this.findLawyerByJwt(jwt);
       
        (await lawyer).jwt="";
        
        console.log(lawyer);
       
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
