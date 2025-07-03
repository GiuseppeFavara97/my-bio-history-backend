import { Injectable, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientDto } from './dto/patient.dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) { }
    async createPatient(patientDto: PatientDto): Promise<Patient> {
        const patient = this.patientRepository.create(patientDto);
        return this.patientRepository.save(patientDto);
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
    async findPatientsByTaxCode(taxCode: string): Promise<Patient[]> {
        const patients = await this.patientRepository.find({ where: { taxCode } });
        if (patients.length === 0) {
            throw new NotFoundException(`No patients found with tax code ${taxCode}`);
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
=======
import { PatientDto } from './dto/patient.dto';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>
  ) { }


  async createPatient(PatientDto: PatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(PatientDto);
    return this.patientRepository.save(patient);
  }

  async findAllpatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findPatientsById(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`patient with ID ${id} not found`);
    }
    return patient;
  }

  async updatepatient(id: number, patientDto: PatientDto): Promise<Patient> {
    await this.patientRepository.update(id, patientDto);
    return this.findPatientsById(id);
  }

  async removepatient(id: number): Promise<void> {
    const result = await this.patientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
>>>>>>> origin/main
