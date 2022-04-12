import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthClientService } from "../auth-client.service";



@Injectable()
export class JwtStrategyClient extends PassportStrategy(Strategy,'jwt') {
  authClientService:AuthClientService ;
  constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:"secret",
      });
    }
   async validate(payload:any) {
    console.log("6")
      return this.authClientService.verifyClient(payload)
     }
  
   
}