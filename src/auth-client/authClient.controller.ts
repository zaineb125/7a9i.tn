import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { AuthClientService } from './auth-client.service';
import { Body, Controller, Post, UseGuards} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Controller("authclient")
export class AuthClientController {
    constructor(private authClientService:AuthClientService){}

    @UseGuards(AuthGuard('jwt'))
    @Post("signin")
    async signIn(@Body() dto:authClientSignInDto){
        return this.authClientService.signIn(dto)
    }

    @Post("signup")
    async signUp(@Body() dto:authClientSignUpDto){
        return this.authClientService.signUp(dto) 
    }
}