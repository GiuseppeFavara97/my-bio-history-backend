import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { UserModule } from './users/user.module';
import { DoctorModule } from './doctors/doctor.module';
import { DiagnosisModule } from './diagnoses/diagnosis.module';
import { CareModule } from './care/care.module';
import { PathologyModule } from './pathologies/pathology.module';
import { AllergyModule } from './allergies/allergy.module';
import { MedicalModule } from './medical_records/medical.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    DoctorModule,
    DiagnosisModule,
    CareModule,
    PathologyModule,
    AllergyModule,
    MedicalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
