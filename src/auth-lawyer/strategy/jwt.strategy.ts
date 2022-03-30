import { AuthLawyerService } from './../auth-lawyer.service';
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(private authLawyerService : AuthLawyerService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey:"secret",
        });
      }
    
      async validate(payload:any) {
       
        return this.authLawyerService.verifyLawyer(payload)
      }
}