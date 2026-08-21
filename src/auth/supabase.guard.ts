import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log('===== AUTH DEBUG =====');
    console.log('Token Header:', req.headers.authorization);
    console.log('Error:', err);
    console.log('Info:', info);
    console.log('======================');

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

