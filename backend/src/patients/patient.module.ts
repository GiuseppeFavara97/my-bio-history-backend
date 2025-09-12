import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MedicalRecordModule } from '../medicalRecords/medical.module';
import { AuthModule } from '../auth/auth.module'; // Importa AuthModule
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    MedicalRecordModule,
    forwardRef(() => AuthModule) // ← qui la modifica
  ],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}