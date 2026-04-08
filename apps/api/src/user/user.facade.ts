import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { UserPrismaService } from './infrastructure/db/prisma.service';

@Injectable()
export class UserFacade {
  constructor(
    private readonly prisma: UserPrismaService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async register(token: DecodedIdToken) {
    const existing = await this.prisma.user.findUnique({
      where: { providerId: token.uid },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        providerId: token.uid,
        email: token.email ?? '',
        name: token.name ?? null,
      },
    });

    await this.firebaseAdmin
      .auth()
      .setCustomUserClaims(token.uid, { id: user.id });

    return user;
  }

  async getMe(token: DecodedIdToken) {
    const user = await this.prisma.user.findUnique({
      where: { providerId: token.uid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
