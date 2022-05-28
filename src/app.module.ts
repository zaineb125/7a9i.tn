import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthClientModule } from './auth-client/auth-client.module';
import { AuthLawyerModule } from './auth-lawyer/auth-lawyer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
<<<<<<< HEAD
import { AppointmentModule } from './appointment/appointment.module';


@Module({
  imports: [AuthClientModule,
            AuthLawyerModule,
            MulterModule.register({
              dest: './files',
            }),
            MongooseModule.forRoot('mongodb+srv://zaineb:zaineb@cluster0.yao1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
            AppointmentModule
           ],
=======
import { CasesModule } from './cases/cases.module';

@Module({
  imports: [
    AuthClientModule,
    AuthLawyerModule,
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://zaineb:zaineb@cluster0.yao1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    CasesModule,
  ],
>>>>>>> 5136c2e08d1f8f091ea1020f74f38d42cbdfb9c6

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
