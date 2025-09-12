import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DoctorModule } from 'src/doctors/doctor.module';
import { PatientModule } from 'src/patients/patient.module';
import { Doctor } from 'src/doctors/doctor.entity'; // Add this import
import { Patient } from 'src/patients/patient.entity'; // Add this import if needed
import { forwardRef } from '@nestjs/common';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Doctor, Patient]),
    DoctorModule,
    forwardRef(() => PatientModule) // ← qui la modifica
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}