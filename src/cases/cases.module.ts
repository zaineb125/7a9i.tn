import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { CasesSchema } from './models/cases.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cases', schema: CasesSchema }]),
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
