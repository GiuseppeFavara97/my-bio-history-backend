import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserRole } from './enum/userRole.enum';
import { DoctorService } from '../doctors/doctor.service';
import { PatientService } from '../patients/patient.service';


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
        
       
    const user = this.userRepository.create({
            ...userDto,
            birthday: userDto.birthday ? new Date(userDto.birthday) : undefined,
            
        });
        const savedUser = await this.userRepository.save(user);
        
        if (userDto.role === UserRole.DOCTOR && userDto.doctor) {
            const doctor = await this.doctorService.createDoctor(userDto.doctor);
            doctor.user = savedUser;
            savedUser.doctor = doctor;
        }

        if (userDto.role === UserRole.PATIENT && userDto.patient) {
  const patient = await this.patientService.createPatient(userDto.patient);
  patient.user = savedUser;
  savedUser.patient = patient;
        }
    return this.userRepository.save(savedUser);
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

