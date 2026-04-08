import { Module } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { UserPrismaService } from './infrastructure/db/prisma.service';
import { UserController } from './infrastructure/controller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserFacade, UserPrismaService],
  exports: [UserFacade, UserPrismaService],
})
export class UserModule {}
