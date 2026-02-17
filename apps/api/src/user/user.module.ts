import { Module } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { UserPrismaService } from './infrastructure/db/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserFacade, UserPrismaService],
  exports: [UserFacade],
})
export class UserModule {}
