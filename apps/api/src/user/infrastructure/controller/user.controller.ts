import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { NotYetRegistered } from 'src/auth/decorators/auth-levels.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('v1/users')
export class UserController {
  @ApiOperation({ summary: 'Create a new user' })
  @NotYetRegistered()
  @Post()
  async createUser(@CurrentUser() user: DecodedIdToken) {
    // TODO: map DecodedIdToken to something simpler
    return user;
  }
}
