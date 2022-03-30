import { PickType } from '@nestjs/swagger';
import { authLawyerSignUpDto } from './authLawyerSignUp.dto';

export class authLawyerSignInDto extends PickType(authLawyerSignUpDto, ["email","password"]) {}


