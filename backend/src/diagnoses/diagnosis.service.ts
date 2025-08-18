import { Injectable, NotFoundException } from '@nestjs/common';
import { DiagnosisDto } from './dto/diagnosis.dto';
import { Diagnosis } from './diagnosis.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/doctor.entity';
import { Patient } from 'src/patients/patient.entity';

@Injectable()
export class DiagnosisService {

  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) { }

  async createDiagnosis(diagnosisDto: DiagnosisDto): Promise<Diagnosis> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: diagnosisDto.doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${diagnosisDto.doctorId} not found`);
    }
    const patient = await this.patientRepository.findOne({
      where: { id: diagnosisDto.patientId },
      relations: ['medicalRecord'],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${diagnosisDto.patientId} not found`);
    }

    const diagnosis = this.diagnosisRepository.create({
      description: diagnosisDto.description,
      doctor: { id: doctor.id },
      patient: { id: patient.id },
      medicalRecords: { id: patient.medicalRecord.id }
    });
    await this.diagnosisRepository.save(diagnosis);
    return diagnosis;
  }

  async findAllDiagnosis(): Promise<Diagnosis[]> {
    return await this.diagnosisRepository.find({
      relations: ['medicalRecord', 'doctor', 'pathology'],
    });

  }


  async findOneDiagnosis(id: number): Promise<Diagnosis> {
    const diagnoses = await this.diagnosisRepository.findOne({ where: { id }, relations: ['medicalRecord', 'doctor', 'pathology'] });
    if (!diagnoses) {
      throw new NotFoundException(`Diagnosis with ID ${id} not found`);
    }
    return diagnoses;
  }

  async updateDiagnosis(id: number, diagnosisDto: DiagnosisDto): Promise<Diagnosis> {
    await this.diagnosisRepository.update(id, diagnosisDto);
    return this.findOneDiagnosis(id);
  }

  async removeDiagnosis(id: number): Promise<void> {
    const remove = await this.diagnosisRepository.delete(id);
    if (remove.affected === 0) {
      throw new NotFoundException(`Diagnosis ID: ${id} not found`);
    }
  }
}
