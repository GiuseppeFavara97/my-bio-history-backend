import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ----------------------------
  // LOGIN (email o telefono)
  // ----------------------------
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() body: { identifier: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.signIn(body.identifier, body.password);

    res.cookie('auth_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { user };
  }

  // ----------------------------
  // INVIO OTP PER RESET PASSWORD
  // ----------------------------
  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body('contact') contact: string) {
    await this.authService.requestPasswordReset(contact);
    return { message: '📩 Codice OTP inviato.' };
  }

  // ----------------------------
  // VERIFICA OTP
  // ----------------------------
  @Public()
  @Post('verify-otp')
  async verifyOtp(@Body() body: { contact: string; otp: string }) {
    return await this.authService.verifyOtp(body.contact, body.otp);
  }

  // ----------------------------
  // RESET PASSWORD
  // ----------------------------
  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: { contact: string; newPassword: string }) {
    return await this.authService.resetPassword(body.contact, body.newPassword);
  }
}
