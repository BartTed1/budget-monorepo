import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserPrismaService } from 'src/user/infrastructure/db/prisma.service';
import { AccountStatus } from '../domain/AccountStatus';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private readonly prisma: UserPrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User context not found');
    }

    if (AccountStatus.isFullyRegistered(user)) {
      return true;
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { providerId: user.uid },
    });

    if (!dbUser) {
      throw new ForbiddenException('User has not completed registration process');
    }

    return true;
  }
}
