import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface ContactDto {
  nome: string;
  email: string;
  messaggio: string;
}

@Injectable()
export class ContactService {
  async sendEmail(contactDto: ContactDto) {
    const { nome, email, messaggio } = contactDto;

    // 🔹 LOG DI DEBUG
    console.log('Dati ricevuti dal frontend:', contactDto);
    console.log('ENV Gmail:', process.env.GMAIL_USER ? 'OK' : 'MANCANTE', process.env.GMAIL_PASS ? 'OK' : 'MANCANTE');
    console.log('Destinatario email:', process.env.MAIL_TO ? process.env.MAIL_TO : 'NON DEFINITO');

    // 🔹 Configura Nodemailer con Gmail + password per app
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Nuovo messaggio dal sito: ${nome}`,
      text: `
Hai ricevuto un nuovo messaggio dal form contatti:

Nome: ${nome}
Email: ${email}

Messaggio:
${messaggio}
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email inviata con successo:', info.response);
      return { success: true, message: 'Email inviata correttamente' };
    } catch (err) {
      console.error('❌ Errore invio email:', err);
      throw new Error('Errore nell’invio dell’email. Controlla la configurazione di Gmail.');
    }
  }
}
