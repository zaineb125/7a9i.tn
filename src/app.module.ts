import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthClientModule } from './auth-client/auth-client.module';
import { UsersModule } from './users/users.module';
<<<<<<< HEAD
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [AuthClientModule, UsersModule, AuthUserModule],
=======
import { AuthLawyerModule } from './auth-lawyer/auth-lawyer.module';

@Module({
  imports: [AuthClientModule, UsersModule, AuthLawyerModule],
>>>>>>> 852dbe7e66ce92687f317196efef674cab0a5508
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
