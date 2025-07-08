import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserRole } from './enum/userRole.enum';
import { MedicalRecordService } from '../medicalRecords/medical.service';
import { DoctorService } from '../doctors/doctor.service';
import { PatientService } from '../patients/patient.service';
import * as bcrypt from 'bcrypt';

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
        const hashedPassword = await bcrypt.hash(userDto.password, 10);

        const user = this.userRepository.create({
            password: hashedPassword,
            email: userDto.email,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            birthday: userDto.birthday,
            birthdayPlace: userDto.birthdayPlace,
            province: userDto.province,
            sex: userDto.sex,
            phoneNumber: userDto.phoneNumber,
            role: userDto.role,

        });

        if (userDto.role === UserRole.DOCTOR && userDto.doctor) {

            const doctor = await this.doctorService.createDoctor(userDto.doctor);
            doctor.user = user;
            user.doctor = doctor;
        }

        if (userDto.role === UserRole.PATIENT && userDto.patient) {

            const patient = await this.patientService.createPatient(userDto.patient);
            patient.user = user;
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

    async findUsersByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
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
}