import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserRole } from './enum/userRole.enum';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { DoctorService } from '../doctors/doctor.service';
import { PatientService } from '../patients/patient.service'; // Assuming you have a similar service for patients
import *as bcrypt from 'bcrypt';
import { async } from 'rxjs/internal/scheduler/async';


@Injectable()
export class UserService {
    users: any;
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private doctorService: DoctorService,
        private patientService: PatientService,

    ) { }

    async createUser(userDto: UserDto): Promise<User> {
        const { role, doctorData, patientData, ...userData } = userDto;

        const user = this.userRepository.create({
            ...userData,
            role,
        });

        if (role === UserRole.DOCTOR) {
            if (!doctorData) {
                throw new BadRequestException('Doctor data is required for role DOCTOR');
            }

            const doctor = await this.doctorService.createDoctor({
                ...doctorData,
                user,
            });
            user.doctor = doctor;
        }

        if (role === UserRole.PATIENT) {
            if (!patientData) {
                throw new BadRequestException('Patient data is required for role PATIENT');
            }

            const patient = await this.patientService.createPatient({
                ...patientData,
                user,
            });
            user.patient = patient;
        }

        return this.userRepository.save(user); // In caso di ruoli futuri
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findUsersByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async updateUser(id: number, userDto: UserDto): Promise<User> {
        await this.userRepository.update(id, userDto);
        return this.findUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    async findOne(email: string, password: string): Promise<User | undefined> {
        // logica per trovare l'utente
        const user = await this.userRepository.findOne({ where: { email } });
        return user === null ? undefined : user;
    }
}








