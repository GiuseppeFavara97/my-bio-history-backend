import { Injectable, NotFoundException } from '@nestjs/common';
import { DiagnosisDto } from './dto/diagnosis.dto';
import { Diagnosis } from './diagnosis.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiagnosisService {

  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
  ) { }

  async creatediagnosis(diagnosisDto: DiagnosisDto): Promise<Diagnosis> {
    const Diagnosis = this.diagnosisRepository.create(diagnosisDto);
    return await this.diagnosisRepository.save(Diagnosis);
  }

  async findAlldiagnosis(): Promise<Diagnosis[]> {
    return await this.diagnosisRepository.find({
      relations: ['medicalrecord'],
    });
      
  }


  async findOnediagnosis(id: number): Promise<Diagnosis> {
    const diagnoses = await this.diagnosisRepository.findOne({ where: { id } });
    if (!diagnoses) {
      throw new NotFoundException(`Diagnosis with ID ${id} not found`);
    }
    return diagnoses;
  }

  async updatediagnosis(id: number, diagnosisDto: DiagnosisDto): Promise<Diagnosis> {
    await this.diagnosisRepository.update(id, diagnosisDto);
    return this.findOnediagnosis(id);
  }

  async softDeleteDiagnosis(id: number): Promise<Diagnosis> {
    const diagnosis = await this.diagnosisRepository.findOne({ where: { id } });
    if (!diagnosis) {
      throw new NotFoundException(`Diagnosis with ID ${id} not found`);
    }
    diagnosis.softDeleted = true;
    await this.diagnosisRepository.save(diagnosis);
    return diagnosis;
  }

  async removediagnosis(id: number): Promise<void> {
    const remove = await this.diagnosisRepository.delete(id);
    if (remove.affected === 0) {
      throw new NotFoundException(`Diagnoses ID: ${id} not found`);
    }
  }
}
