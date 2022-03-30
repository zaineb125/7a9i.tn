import { AuthLawyerService } from './../auth-lawyer.service';
import { Injectable } from "@nestjs/common";
import { JwtStrategyUser } from 'src/auth-user/strategy/jwt.strategy';


@Injectable()
export class JwtStrategyLawyer extends  JwtStrategyUser {
    constructor(private authLawyerService : AuthLawyerService) {
      super()
    }

    
    async validate(payload:any) {
      return this.authLawyerService.verifyLawyer(payload)
    }
}