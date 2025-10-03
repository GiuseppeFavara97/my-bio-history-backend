import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IS_PUBLIC_KEY, ROLES_KEY } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verifica se la rotta è pubblica
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token non trovato');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Token non valido');
    }

    // Verifica ruoli se richiesti
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles?.length) {
      const userRole = request.user?.role;
      if (!userRole || !requiredRoles.includes(userRole)) {
        throw new ForbiddenException('Accesso negato: ruolo non autorizzato');
      }
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    // Priorità al token nel cookie
    const cookieToken = (request as any).cookies?.auth_token;
    if (cookieToken) return cookieToken;

    // Fallback al token nell'header Authorization
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
