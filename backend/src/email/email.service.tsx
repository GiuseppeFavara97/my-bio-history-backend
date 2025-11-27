import { Injectable, Logger } from '@nestjs/common';
import * as React from 'react';
import { render } from 'jsx-email';
import * as nodemailer from 'nodemailer';
import OtpEmail from './template/OtpEmail';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter;

  constructor() {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      this.logger.error('Gmail credentials are missing in .env!');
      throw new Error('Gmail credentials missing');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async sendOtpEmail(to: string, otp: string, firstName: string) {
    try {
      const html = await render(
        React.createElement(OtpEmail, { otp, firstName })
      );

      await this.transporter.sendMail({
        from: `"Clinica Digitale" <${process.env.GMAIL_USER}>`,
        to,
        subject: 'Codice OTP per il reset della password',
        html,
      });

      this.logger.log(`OTP email sent to ${to}`);
    } catch (error: any) {
      this.logger.error('Error sending OTP email', error?.stack ?? error);
      throw new Error('Errore nell’invio dell’OTP');
    }
  }
}
