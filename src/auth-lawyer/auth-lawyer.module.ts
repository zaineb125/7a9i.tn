import { Module } from '@nestjs/common';
import { AuthLawyerController } from './auth-lawyer.controller';
import { AuthLawyerService } from './auth-lawyer.service';
import { JwtStrategyLawyer } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthUserService } from 'src/auth-user/auth-user.service';
import { AuthUserModule } from 'src/auth-user/auth-user.module';


@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      signOptions: {
      expiresIn: '24h',
      }
      }),
    PassportModule.register({defaultStrategy: 'jwt'}), 
    AuthUserModule
    
  ],
  controllers: [AuthLawyerController],
  providers: [AuthLawyerService,
              JwtStrategyLawyer,
              AuthUserService
              ]
})
export class AuthLawyerModule {}
