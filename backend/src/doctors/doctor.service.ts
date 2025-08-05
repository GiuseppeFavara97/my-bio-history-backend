import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';



@Injectable()
export class DoctorService {
  removeDoctor(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  userRepository: any;
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>
  ) { }


  async createDoctor(doctorDto: DoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorDto);
    return this.doctorRepository.save(doctor);
  }

  async findAllDoctors(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findDoctorsById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async softDeleteDoctor(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['user'], // <-- FIXED: use array of relation names
    });

    if (!doctor) throw new NotFoundException('Doctor not found');

    // 1. Soft delete doctor
    await this.doctorRepository.update(id, {
      softDeleted: true
    });

    // 2. Soft delete linked user
    if (doctor.user) {
      await this.userRepository.update(doctor.user.id, { deleted: true });
      doctor.user.softDeleted = true; // Update the user object to reflect the soft delete
    }
    doctor.softDeleted = true; // Update the doctor object to reflect the soft delete
    return doctor;
  }

  async updateDoctor(id: number, doctorDto: DoctorDto): Promise<Doctor> {
    await this.doctorRepository.update(id, doctorDto);
    return this.findDoctorsById(id);
  }

  
}
