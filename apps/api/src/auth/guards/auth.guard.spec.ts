import { AuthGuard } from './auth.guard';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let firebaseAdminMock: any;

  beforeEach(() => {
    firebaseAdminMock = {
      auth: jest.fn().mockReturnThis(),
      verifyIdToken: jest.fn(),
    };
    guard = new AuthGuard(firebaseAdminMock);
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid-token',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    firebaseAdminMock.verifyIdToken.mockRejectedValue(
      new Error('Invalid token'),
    );

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return true and set user in request if token is valid', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext;

    const decodedToken = { uid: '123', email: 'test@example.com' };
    firebaseAdminMock.verifyIdToken.mockResolvedValue(decodedToken);

    const result = await guard.canActivate(mockContext);
    expect(mockContext.switchToHttp().getRequest().user).toEqual(decodedToken);
    expect(result).toBe(true);
  });
});
