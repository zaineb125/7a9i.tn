import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';
import {JwtStrategyUser } from './strategy/jwt.strategy';

@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      signOptions: {
      expiresIn: '24h',
      }
      }),
    PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [AuthUserController],
  providers: [AuthUserService,
              JwtStrategyUser
             ]
})
export class AuthUserModule {}
