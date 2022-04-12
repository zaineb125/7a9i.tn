import { GetCurrentUserById } from './auth-client/utils/get-user-by-id.decorator';
import { Controller, Get, UseGuards ,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth-lawyer/guards/JwtGuard.guard';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() userId:number): string {
    return this.appService.getHello(userId);
  }
}
