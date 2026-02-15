import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountStatus } from '../domain/AccountStatus';
import { Request } from 'express';

@Injectable()
export class AccountGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User context not found');
    }

    if (!AccountStatus.isFullyRegistered(user)) {
      throw new ForbiddenException(
        'User has not completed registration process',
      );
    }

    return true;
  }
}
