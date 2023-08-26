import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HomeModule } from 'src/home/home.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports:[PrismaModule,HomeModule]
})
export class MessageModule {}
