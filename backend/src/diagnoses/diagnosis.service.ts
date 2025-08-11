import { Injectable, NotFoundException } from '@nestjs/common';
import { DiagnosisDto } from './dto/diagnosis.dto';
import { Diagnosis } from './diagnosis.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from 'src/medicalRecords/medical.entity';
import { Pathology } from 'src/pathologies/pathology.entity';
import { Doctor } from 'src/doctors/doctor.entity';

@Injectable()
export class DiagnosisService {

  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
    @InjectRepository(MedicalRecord)
    private medicalRecordRepository: Repository<MedicalRecord>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Pathology)
    private pathologyRepository: Repository<Pathology>,
  ) { }

  async createDiagnosis(dto: { medicalRecordId: number; doctorId: number; pathologyId: number; description: string; date: Date }): Promise<Diagnosis> {
    const medicalRecord = await this.medicalRecordRepository.findOne({ where: { id: dto.medicalRecordId } });
    const doctor = await this.doctorRepository.findOne({ where: { id: dto.doctorId } });
    const pathology = await this.pathologyRepository.findOne({ where: { id: dto.pathologyId } });

    if (!medicalRecord || !doctor || !pathology) throw new NotFoundException('MedicalRecord, Doctor or Pathology not found');

    const diagnosis = this.diagnosisRepository.create({
      medicalRecord,
      doctor,
      pathology,
      description: dto.description,
      date: dto.date,
    });

    return this.diagnosisRepository.save(diagnosis);
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
