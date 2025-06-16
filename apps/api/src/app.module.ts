import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; 
import { UserModule } from './user/user.module';
import { BugModule } from './bug/bug.module';

@Module({
  imports: [UserModule, BugModule],
  providers: [PrismaService],
})
export class AppModule {}
