import { AuthUserModule } from './../auth-user/auth-user.module';
import { UsersModule } from './../users/users.module';
import {  JwtStrategyClient } from './strategy/jwt.strategy';
import { AuthClientController } from './authClient.controller';
import { Module } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthUserService } from 'src/auth-user/auth-user.service';


@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      signOptions: {
      expiresIn: '24h',
      }
      }),
    PassportModule.register({defaultStrategy: 'jwt'}), 
    UsersModule,
    AuthUserModule
  ],
  controllers:[AuthClientController],
  providers: [AuthClientService,
              JwtStrategyClient,
              AuthUserService
            ]
})
export class AuthClientModule {}
