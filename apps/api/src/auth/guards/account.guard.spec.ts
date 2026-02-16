import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AccountStatus } from '../domain/AccountStatus';
import { AccountGuard } from './account.guard';

describe('AccountGuard', () => {
  let guard: AccountGuard;

  beforeEach(() => {
    guard = new AccountGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw UnauthorizedException if user context is not found', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({}), // No user in request
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw ForbiddenException if user has not completed registration process', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            /* Incomplete user data */
          },
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      'User has not completed registration process',
    );
  });

  it('should return true if user is fully registered', async () => {
    const mockUser = {
      email: 'test@example.com',
      id: '12345',
    };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: mockUser,
        }),
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(AccountStatus, 'isFullyRegistered').mockReturnValue(true);

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
  });
});
