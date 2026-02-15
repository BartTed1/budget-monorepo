import { Module } from '@nestjs/common';
import { AuthFacade } from './auth.facade';
import { AuthGuard } from './guards/auth.guard';
import { AccountGuard } from './guards/account.guard';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthFacade, AuthGuard, AccountGuard],
  exports: [AuthFacade, AuthGuard, AccountGuard],
})
export class AuthModule {}
