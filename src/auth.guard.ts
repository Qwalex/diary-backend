import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { configDotenv } from 'dotenv';
import { timingSafeEqual } from 'crypto';

configDotenv();

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['x-auth-token'];

    if (
      !authHeader ||
      typeof authHeader !== 'string' ||
      !process.env.AUTH_TOKEN ||
      !timingSafeEqual(
        Buffer.from(authHeader),
        Buffer.from(process.env.AUTH_TOKEN),
      )
    ) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    return true;
  }
}
