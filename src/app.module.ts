import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
