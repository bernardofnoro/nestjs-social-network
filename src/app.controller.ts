import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './shared/database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
