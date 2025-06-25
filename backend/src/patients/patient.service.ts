import { Injectable, NotFoundException } from '@nestjs/common';
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
