import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/infrastructure/controller/user.controller';

@Module({
  imports: [FirebaseModule, AuthModule, UserModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
