import { Module } from '@nestjs/common';
import { AuthLawyerController } from './auth-lawyer.controller';
import { AuthLawyerService } from './auth-lawyer.service';
import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
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
  controllers: [AuthLawyerController],
  providers: [AuthLawyerService,
                JwtStrategy,
                UsersService]
})
export class AuthLawyerModule {}
