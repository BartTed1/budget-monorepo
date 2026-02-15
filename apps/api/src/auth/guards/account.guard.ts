import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AccountStatus } from '../domain/AccountStatus';

@Injectable()
export class AccountGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!AccountStatus.isFullyRegistered(user)) {
      throw new ForbiddenException(
        'User has not completed registration process',
      );
    }

    return true;
  }
}
