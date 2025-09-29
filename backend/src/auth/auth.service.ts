import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  /**
   * Effettua il login utente restituendo JWT e dati essenziali
   * @param email Email utente
   * @param password Password in chiaro
   */
  async signIn(email: string, password: string): Promise<{ access_token: string, user: Partial<User> }> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenziali non valide');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenziali non valide');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  }
}