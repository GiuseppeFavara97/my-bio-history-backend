import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import { UserDto } from './dto/user.dto';
import { UserRole } from './enum/userRole.enum';
import { ItalyCities } from 'src/common/utils/italyCities';
import { DoctorService } from '../doctors/doctor.service';
import { PatientService } from '../patients/patient.service';
import { Patient } from '../patients/patient.entity';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class UserService {
    loggedUser(sub: any) {
        throw new Error('Method not implemented.');
    }
    generateTaxCode(userDto: UserDto) {
        throw new Error('Method not implemented.');
    }
    softDeleteUser(id: number): User | PromiseLike<User> {
        throw new Error('Method not implemented.');
    }
    findAllUsers() {
        throw new Error('Method not implemented.');
    }
    createUser(userDto: UserDto) {
        throw new Error('Method not implemented.');
    }
    updateProfileImage(userId: any, imageUrl: string) {
      throw new Error('Method not implemented.');
    }
    updateUser(userId: any, body: any) {
      throw new Error('Method not implemented.');
    }
    findByEmailOrPhone(contact: string) {
      throw new Error('Method not implemented.');
    }
    updateUserPassword(id: any, encrypted: string) {
      throw new Error('Method not implemented.');
    }
    // -----------------------------------------------------
    // RESET PASSWORD DOPO OTP
    // -----------------------------------------------------
    findUserById(userId: any) {
      throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
        private doctorService: DoctorService,
        private patientService: PatientService,
    ) {}

    // -----------------------------------------------------
    //  GENERAZIONE OTP + INVIO EMAIL
    // -----------------------------------------------------
    async generateOtpForEmail(email: string): Promise<string> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new NotFoundException('Email non trovata');

        // Genera OTP a 6 cifre
        const otp = randomInt(100000, 999999).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000); // scade in 10 minuti

        user.resetOtp = otp;
        user.resetOtpExpires = expires;
        await this.userRepository.save(user);

        // Invio email tramite Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Clinica" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Codice OTP per reset password",
            text: `Il tuo codice OTP è: ${otp}. Valido per 10 minuti.`,
        });

        return "OTP inviato";
    }

    // -----------------------------------------------------
    //  RESET PASSWORD DOPO OTP
    // -----------------------------------------------------
    async resetPassword(email: string, otp: string, newPassword: string): Promise<string> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new NotFoundException("Utente non trovato");

        if (!user.resetOtp || !user.resetOtpExpires)
            throw new BadRequestException("Nessun OTP generato");

        if (user.resetOtp !== otp)
            throw new BadRequestException("OTP non valido");

        if (user.resetOtpExpires < new Date())
            throw new BadRequestException("OTP scaduto");

        const hashed = await bcrypt.hash(newPassword, 10);

        user.password = hashed;
        user.resetOtp = '';
        user.resetOtpExpires = null as any;

        await this.userRepository.save(user);

        return "Password aggiornata con successo";
    }

  

}
