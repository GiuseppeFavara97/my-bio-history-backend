import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientDto } from './dto/patient.dto';
import { MedicalRecordService } from '../medicalRecords/medical.service';


@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private medicalRecordService: MedicalRecordService,
  ) { }

  async createPatient(patientDto: PatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(patientDto);
    const savedPatient = await this.patientRepository.save(patient);
    // Crea automaticamente il MedicalRecord
    await this.medicalRecordService.createMedicalRecord({
      patientId: savedPatient.id,
    });

    return savedPatient;
  }

  async findAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findPatientById(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async updatePatient(id: number, patientDto: Patient): Promise<Patient> {
    await this.patientRepository.update(id, patientDto);
    return this.findPatientById(id);
  }

  async deletePatient(id: number): Promise<void> {
    const result = await this.patientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async findPatientsByMainPatientId(mainPatientId: number): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { mainPatientId } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found for main patient ID ${mainPatientId}`);
    }
    return patients;
  }

  async findPatientsByUserId(userId: number): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { userId } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found for user ID ${userId}`);
    }
    return patients;
  }

  async findPatientsByFullName(fullName: string): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { fullName } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found with full name ${fullName}`);
    }
    return patients;
  }

  async findPatientsByRelationToMainPatient(relationToMainPatient: string): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { relationToMainPatient } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found with relation to main patient ${relationToMainPatient}`);
    }
    return patients;
  }
}

