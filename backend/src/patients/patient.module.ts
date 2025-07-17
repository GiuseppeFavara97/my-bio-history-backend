import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MedicalRecordModule } from '../medicalRecords/medical.module';


@Module({
  imports: [TypeOrmModule.forFeature([Patient]),
MedicalRecordModule,
],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule { }