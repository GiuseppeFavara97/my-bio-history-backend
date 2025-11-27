import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  // ---------------- LOGIN ----------------
  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Email non trovata');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Password errata');

    const access_token = 'FAKE_TOKEN'; // sostituire con JWT reale
    return { access_token, user };
  }

  // ---------------- RICHIESTA OTP ----------------
  async requestPasswordReset(contact: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: contact }, { phoneNumber: contact }],
    });

    if (!user) throw new NotFoundException('Utente non trovato');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minuti
    await this.userRepository.save(user);

    try {
      await this.emailService.sendOtpEmail(user.email, otp, user.firstName || 'Utente');
    } catch (err) {
      console.error('Errore invio OTP:', err);
      throw new BadRequestException('Errore nell’invio dell’OTP');
    }

    return { message: '📩 Codice OTP inviato.' };
  }

  // ---------------- VERIFICA OTP ----------------
  async verifyOtp(contact: string, otp: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: contact }, { phoneNumber: contact }],
    });

    if (!user) throw new NotFoundException('Utente non trovato');
    if (!user.resetOtp || !user.resetOtpExpires)
      throw new BadRequestException('Nessun OTP richiesto.');
    if (user.resetOtp !== otp) throw new UnauthorizedException('OTP non corretto.');
    if (user.resetOtpExpires < new Date()) throw new UnauthorizedException('OTP scaduto.');

    return { message: '✅ OTP verificato', userId: user.id };
  }

  // ---------------- RESET PASSWORD ----------------
  async resetPassword(contact: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: contact }, { phoneNumber: contact }],
    });

    if (!user) throw new NotFoundException('Utente non trovato');

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetOtp = '';
    user.resetOtpExpires = null as unknown as Date;

    await this.userRepository.save(user);

    return { message: '✅ Password aggiornata con successo.' };
  }
}
