import { JwtStrategyUser } from './../../auth-user/strategy/jwt.strategy';
import { AuthClientService } from './../auth-client.service';
import { Injectable } from "@nestjs/common";



@Injectable()
export class JwtStrategyClient extends JwtStrategyUser {
    constructor(private authClientService : AuthClientService) {
        super()
      }
    
      async validate(payload:any) {
        
       return this.authClientService.verifyClient(payload)
      }
}