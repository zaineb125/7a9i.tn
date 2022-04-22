import { AuthClientController } from './authClient.controller';
import { Module } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthClientSchema } from './models/auth-client.model';
import { JwtStrategyClient } from './strategy/jwt.strategy';


@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      signOptions: {
      expiresIn: '24h',
      }
      }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{name:"authClient",schema:AuthClientSchema}]),
   
  ],
  controllers:[AuthClientController],
  providers: [AuthClientService,
              JwtStrategyClient,
              
            ]
})
export class AuthClientModule {}
