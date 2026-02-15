import { Global, Module } from '@nestjs/common';
import { AuthFacade } from './auth.facade';
import { AuthGuard } from './guards/auth.guard';
import { AccountGuard } from './guards/account.guard';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AuthFacade, AuthGuard, AccountGuard],
  exports: [AuthFacade, AuthGuard, AccountGuard],
})
export class AuthModule {}
