import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthClientModule } from './auth-client/auth-client.module';
import { UsersModule } from './users/users.module';
import { AuthLawyerModule } from './auth-lawyer/auth-lawyer.module';

@Module({
  imports: [AuthClientModule, UsersModule, AuthLawyerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
