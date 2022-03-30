
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AuthUserService } from "../auth-user.service";



@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy,'jwt') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey:"secret",
        });
      }
    
     
}