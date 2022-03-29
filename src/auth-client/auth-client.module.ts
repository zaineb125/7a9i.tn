import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthClientController } from './authClient.controller';
import { Module } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users/users.service';


@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      signOptions: {
      expiresIn: '24h',
      }
      }),
    PassportModule.register({defaultStrategy: 'jwt'}), 
    UsersModule
  ],
  controllers:[AuthClientController],
  providers: [AuthClientService,
              JwtStrategy,
              UsersService
            ]
})
export class AuthClientModule {}
