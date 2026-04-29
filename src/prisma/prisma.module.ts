import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Isso torna o PrismaService disponível em todo o app
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}