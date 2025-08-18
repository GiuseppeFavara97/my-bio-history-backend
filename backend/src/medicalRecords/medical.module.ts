import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './medical.entity';
import { MedicalRecordService } from './medical.service';
import { MedicalRecordController } from './medical.controller';
import { Patient } from 'src/patients/patient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MedicalRecord, Patient])],
    providers: [MedicalRecordService],
    controllers: [MedicalRecordController],
    exports: [MedicalRecordService],
})
export class MedicalRecordModule { }