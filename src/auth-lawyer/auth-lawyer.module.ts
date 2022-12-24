import { AuthLawyerSchema } from './models/auth-lawyer.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthLawyerController } from './auth-lawyer.controller';
import { AuthLawyerService } from './auth-lawyer.service';
import { JwtStrategyLawyer } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    MongooseModule.forFeature([
      { name: 'authLawyer', schema: AuthLawyerSchema },
    ]),
  ],
  controllers: [AuthLawyerController],
  providers: [AuthLawyerService, JwtStrategyLawyer],
})
export class AuthLawyerModule {}
