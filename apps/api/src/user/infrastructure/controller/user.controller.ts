import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import {
  NotYetRegistered,
  Registered,
} from 'src/auth/decorators/auth-levels.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserFacade } from 'src/user/user.facade';
import { UserDto } from './dto/user.dto';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiOperation({ summary: 'Register a new user' })
  @NotYetRegistered()
  @Post()
  async createUser(@CurrentUser() token: DecodedIdToken): Promise<UserDto> {
    const user = await this.userFacade.register(token);
    return { id: user.id, email: user.email, name: user.name, providerId: user.providerId };
  }

  @ApiOperation({ summary: 'Get current user' })
  @Registered()
  @Get('me')
  async getMe(@CurrentUser() token: DecodedIdToken): Promise<UserDto> {
    const user = await this.userFacade.getMe(token);
    return { id: user.id, email: user.email, name: user.name, providerId: user.providerId };
  }
}
