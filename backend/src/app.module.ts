import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { DoctorModule } from './doctors/doctor.module';
import { DiagnosisModule } from './diagnoses/diagnosis.module';
import { CareModule } from './care/care.module';
import { AllergyModule } from './allergies/allergy.module';
import { MedicalRecordModule } from './medicalRecords/medical.module';
import { PatientModule } from './patients/patient.module';
import { VaccineModule } from './vaccines/vaccine.module';
import { UploadDocumentModule } from './uploadDocuments/uploadDocument.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    DoctorModule,
    DiagnosisModule,
    CareModule,
    AllergyModule,
    MedicalRecordModule,
    PatientModule,
    VaccineModule,
    UploadDocumentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
