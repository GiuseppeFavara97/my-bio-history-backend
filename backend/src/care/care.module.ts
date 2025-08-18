import { Module } from '@nestjs/common';
import { CareService } from './care.service';
import { CareController } from './care.controller';
import { Care } from './care.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from 'src/medicalRecords/medical.entity';
import { Doctor } from 'src/doctors/doctor.entity';
import { Patient } from 'src/patients/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Care, Doctor, Patient, MedicalRecord])],
  controllers: [CareController],
  providers: [CareService],
})
export class CareModule { }

