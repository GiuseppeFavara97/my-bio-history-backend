import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicalRecord } from './medical.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecordDto } from './dto/medicalRecord.dto';
import { Patient } from '../patients/patient.entity'; // Assuming you have a Patient entity

@Injectable()
export class MedicalRecordService {
    constructor(
        @InjectRepository(MedicalRecord)
        private medicalRepository: Repository<MedicalRecord>,

        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,

    ) { }

    async createMedicalRecord(medicalRecordDto: MedicalRecordDto): Promise<MedicalRecord> {
        const medicalRecord: MedicalRecord = this.medicalRepository.create({
            patient: { id: medicalRecordDto.patientId } as Patient
        });
        return this.medicalRepository.save(medicalRecord);
    }

    async findAllMedicalRecords(): Promise<MedicalRecord[]> {
        return this.medicalRepository.find();
    }

    async findMedicalRecordById(id: number): Promise<MedicalRecord> {
        const medicalRecord = await this.medicalRepository.findOne({ where: { id } });
        if (!medicalRecord) {
            throw new NotFoundException(`Medical_Records with ID ${id} not found`);
        }
        return medicalRecord;
    }

    async updateMedicalRecord(id: number, medicalRecordDto: MedicalRecordDto): Promise<MedicalRecord> {
        await this.medicalRepository.update(id, {
            patient: { id: medicalRecordDto.patientId }
        });
        return this.findMedicalRecordById(id);
    }

    async deleteMedicalRecord(id: number): Promise<void> {
        const result = await this.medicalRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Medical_Records with ID ${id} not found`);
        }
    }

    async findByPatient(patientId: number): Promise<MedicalRecord> {
        return this.medicalRepository.findOne({
            where: { patient: { id: patientId } },
            relations: ['diagnoses', 'cares'],
        });
    }
}
