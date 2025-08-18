import { Injectable, NotFoundException } from '@nestjs/common';
import { Vaccine } from './vaccine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccineDto } from './dto/vaccine.dto';
import { Patient } from 'src/patients/patient.entity';

@Injectable()
export class VaccineService {
    constructor(
        @InjectRepository(Vaccine)
        private vaccineRepository: Repository<Vaccine>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) { }
    async createVaccine(vaccineDto: VaccineDto): Promise<Vaccine> {
        const patient = await this.patientRepository.findOne({
            where: { id: vaccineDto.patientId },
            relations: ["medicalRecord"]
        });

        if (!patient) {
            throw new NotFoundException(`Patient with ID ${vaccineDto.patientId} not found`);
        }

        const vaccine = this.vaccineRepository.create({
            name: vaccineDto.name,
            vaccinationDate: vaccineDto.vaccinationDate,
            type: vaccineDto.type,
            note: vaccineDto.note,
            patient: { id: patient.id },
            medicalRecord: { id: patient.medicalRecord.id }
        });

        await this.vaccineRepository.save(vaccine);
        return vaccine;
    }
    async findAllVaccines(): Promise<Vaccine[]> {
        return this.vaccineRepository.find();
    }
    async findVaccineById(id: number): Promise<Vaccine> {
        const vaccine = await this.vaccineRepository.findOne({ where: { id } });
        if (!vaccine) {
            throw new NotFoundException(`Vaccine with ID ${id} not found`);
        }
        return vaccine;
    }
    async updateVaccine(id: number, vaccineDto: VaccineDto): Promise<Vaccine> {
        await this.vaccineRepository.update(id, vaccineDto);
        return this.findVaccineById(id);
    }
    async deleteVaccine(id: number): Promise<void> {
        const result = await this.vaccineRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Vaccine with ID ${id} not found`);
        }
    }

}