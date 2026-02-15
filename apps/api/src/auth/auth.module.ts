import { Module } from '@nestjs/common';
import { AuthFacade } from './auth.facade';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [AuthFacade],
})
export class AuthModule {}
