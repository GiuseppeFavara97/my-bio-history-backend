import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DoctorModule } from 'src/doctors/doctor.module';
import { PatientModule } from 'src/patients/patient.module';
import { Doctor } from 'src/doctors/doctor.entity'; // Add this import
import { Patient } from 'src/patients/patient.entity'; // Add this import if needed


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Doctor, Patient]), // Register User, Doctor, and Patient entities
        DoctorModule,
        PatientModule
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }