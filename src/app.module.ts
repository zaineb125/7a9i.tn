import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthClientModule } from './auth-client/auth-client.module';
import { UsersModule } from './users/users.module';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [AuthClientModule, UsersModule, AuthUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
