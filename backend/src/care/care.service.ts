import { Injectable, NotFoundException } from '@nestjs/common';
import { CareDto } from './dto/care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Care } from './care.entity';
import { Doctor } from 'src/doctors/doctor.entity';
import { Patient } from 'src/patients/patient.entity';

@Injectable()
export class CareService {
  constructor(
    @InjectRepository(Care)
    private careRepository: Repository<Care>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) { }
  // This service is responsible for managing care entities.
  async createCare(careDto: CareDto): Promise<Care> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: careDto.doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${careDto.doctorId} not found`);
    }
    const patient = await this.patientRepository.findOne({
      where: { id: careDto.patientId },
      relations: ['medicalRecord'],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${careDto.patientId} not found`);
    }
    const care = this.careRepository.create({
      name: careDto.name,
      description: careDto.description,
      duration_days: careDto.duration_days,
      daily_frequency: careDto.daily_frequency,
      diagnosis: { id: careDto.diagnosisId },
      doctor: { id: doctor.id },
      patient: { id: patient.id },
      medicalRecord: { id: patient.medicalRecord.id }
    });
    const savedCare = await this.careRepository.save(care);
    return savedCare;
  }

  async findAllCare(): Promise<Care[]> {
    return await this.careRepository.find();
  }

  async findOneCare(id: number) {
    const care = await this.careRepository.findOne({ where: { id } });
    if (!care) {
      throw new NotFoundException(`Care with ID ${id} not found`);
    }
    return care;
  }

  async updateCare(id: number, careDto: CareDto): Promise<Care> {
    await this.careRepository.update(id, careDto);
    return this.findOneCare(id);
  }
  async softDeleteCare(id: number): Promise<Care> {
    const care = await this.careRepository.findOne({ where: { id } });
    if (!care) {
      throw new NotFoundException(`Care with ID ${id} not found`);
    }
    care.softDeleted = true;
    await this.careRepository.save(care);
    return care;
  }

  async deleteCare(id: number): Promise<void> {
    const careToRemove = await this.careRepository.delete(id);
    if (careToRemove.affected === 0) {
      throw new NotFoundException(`Care ID: ${id} not found`);
    }

  }
}