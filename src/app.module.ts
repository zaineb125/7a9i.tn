import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthClientModule } from './auth-client/auth-client.module';
import { AuthLawyerModule } from './auth-lawyer/auth-lawyer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthMiddleware } from './auth.middleware';


@Module({
  imports: [AuthClientModule,
            AuthLawyerModule,
            MulterModule.register({
              dest: './files',
            }),
            MongooseModule.forRoot('mongodb+srv://zaineb:zaineb@cluster0.yao1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
            AppointmentModule
           ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
