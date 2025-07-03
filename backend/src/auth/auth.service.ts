import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import *as bcrypt from 'bcrypt';
import { IsStrongPassword } from 'class-validator';

@Injectable()

export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email, password);
    if (!user) {
      throw new UnauthorizedException("invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}