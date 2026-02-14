import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IUser, sayHello } from '@repo/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const user: IUser = { id: 1, name: 'NestJS', email: 'test@test.com', role: 'ADMIN' };
    console.log('User from shared type:', user);
    return this.appService.getHello() + ' ' + sayHello('NestJS');
  }
}
