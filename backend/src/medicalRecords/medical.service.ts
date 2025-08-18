import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicalRecord } from './medical.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecordDto } from './dto/medicalRecord.dto';
import { Patient } from '../patients/patient.entity'; // Assuming you have a Patient entity
import {User} from "../users/user.entity";

@Injectable()
export class MedicalRecordService {
    constructor(
        @InjectRepository(MedicalRecord)
        private medicalRecordRepository: Repository<MedicalRecord>,

    ) { }

    async createMedicalRecord(medicalRecordDto: MedicalRecordDto): Promise<MedicalRecord> {
        const medicalRecord: MedicalRecord = this.medicalRecordRepository.create({
            patient: { id: medicalRecordDto.patientId } as Patient
        });
        return this.medicalRecordRepository.save(medicalRecord);
    }

    async findAllMedicalRecords(): Promise<MedicalRecord[]> {
        return this.medicalRecordRepository.find();
    }

    async findMedicalRecordById(id: number): Promise<MedicalRecord> {
        const medicalRecord = await this.medicalRecordRepository.findOne({ where: { id } });
        if (!medicalRecord) {
            throw new NotFoundException(`Medical_Records with ID ${id} not found`);
        }
        return medicalRecord;
    }

    async softDeleteMedical(id: number): Promise<MedicalRecord> {
    const medicalRecord = await this.medicalRepository.findOne({
      where: { id }});
    if (!medicalRecord) throw new NotFoundException(`Patient not found`);
    await this.medicalRepository.update(id, {
        softDeleted: true
    });
    medicalRecord.softDeleted = true;
    return medicalRecord;
  }

    async updateMedicalRecord(id: number, medicalRecordDto: MedicalRecordDto): Promise<MedicalRecord> {
        await this.medicalRecordRepository.update(id, {
            patient: { id: medicalRecordDto.patientId }
        });
        return this.findMedicalRecordById(id);
    }

    async deleteMedicalRecord(id: number): Promise<void> {
        const result = await this.medicalRecordRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Medical_Records with ID ${id} not found`);
        }
    }
    async getFullMedicalRecordByPatientId(patientId: number): Promise<MedicalRecord> {
        const medicalRecord = await this.medicalRecordRepository.findOne({
            where: { patient: { id: patientId } },
            relations: [
                'patient',
                'cares',
                'vaccines',
                'allergies',
                'diagnoses',
            ],
        });

        if (!medicalRecord) {
            throw new NotFoundException(`Medical record for patient ${patientId} not found`);
        }

        return medicalRecord;
    }

}
