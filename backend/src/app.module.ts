import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

import { ConfigModule } from '@nestjs/config';
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
import { ContactModule } from './contact/contanct.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    // ✅ Moduli applicativi
    AuthModule,
    UserModule,
    DoctorModule,
    DiagnosisModule,
    CareModule,
    AllergyModule,
    MedicalRecordModule,
    PatientModule,
    VaccineModule,
    UploadDocumentModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
