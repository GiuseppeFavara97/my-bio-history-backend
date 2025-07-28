import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import *as bcrypt from 'bcrypt';

@Injectable()

export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, password: string): Promise<{ access_token: string , ruolo :string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("invalid credentials");
    }
    if (user.password === password) {
  // password in chiaro per test per ora...
} else {
  // questa parte fa il check della pass hashata 
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedException("Credenziali non valide");
  }
}


    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      ruolo: user.role, 
    };
  }
}