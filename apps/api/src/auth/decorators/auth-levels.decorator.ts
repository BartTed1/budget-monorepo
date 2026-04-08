import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccountGuard } from '../guards/account.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

/**
 * Decorator for routes that require the user to be authenticated and have an account in the system
 * @returns Guard that checks if the user is authenticated and has an account in the system
 */
export function Registered() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    UseGuards(AuthGuard, AccountGuard),
  );
}

/**
 * Decorator for routes that require the user to be authenticated but not necessarily have an account in the system
 * @returns Guard that checks if the user is authenticated
 */
export function NotYetRegistered() {
  return applyDecorators(ApiBearerAuth('access-token'), UseGuards(AuthGuard));
}
