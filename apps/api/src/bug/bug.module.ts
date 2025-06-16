import { Module } from '@nestjs/common';
import { BugService } from './bug.service';
import { BugController } from './bug.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BugController],
  providers: [BugService, PrismaService],
  exports: [BugService],
})
export class BugModule {}
