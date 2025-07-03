import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>
  ) { }


  async createdoctor(doctorDto: DoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorDto);
    return this.doctorRepository.save(doctor);
  }

  async findAlldoctors(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findDoctorsById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async updateDoctor(id: number, doctorDto: DoctorDto): Promise<Doctor> {
    await this.doctorRepository.update(id, doctorDto);
    return this.findDoctorsById(id);
  }

  async removedoctor(id: number): Promise<void> {
    const result = await this.doctorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
  }
}
