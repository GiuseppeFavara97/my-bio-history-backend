import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosis } from './diagnosis.entity';
import { MedicalRecord } from 'src/medicalRecords/medical.entity';
import { Patient } from 'src/patients/patient.entity';
import { Doctor } from 'src/doctors/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosis, MedicalRecord, Doctor, Patient])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule { }
