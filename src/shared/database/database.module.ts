import { Module, Global } from '@nestjs/common';
import { PrismaService } from './database.service';

@Global() // Disponibilizando o DatabaseModule globalmente
@Module({
  providers: [
    PrismaService,
  ],
  exports: [
    PrismaService, // Exportando o serviço do Prisma no DatabaseModule
  ]
})
export class DatabaseModule {}
