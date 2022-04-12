import { AuthLawyerService } from 'src/auth-Lawyer/auth-Lawyer.service';
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";




@Injectable()
export class JwtStrategyLawyer extends PassportStrategy(Strategy,'jwt') {
  authLawyerService:AuthLawyerService  
  constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey:"secret",
        });
      }

      async validate(payload:any) {
        
        //return this.authLawyerService.verifyLawyer(payload)
       }
    
     
}