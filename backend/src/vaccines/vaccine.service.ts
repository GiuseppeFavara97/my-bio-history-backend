import { Injectable, NotFoundException } from '@nestjs/common';
import { Vaccine } from './vaccine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccineDto } from './dto/vaccine.dto';

@Injectable()
export class VaccineService {
    constructor(
        @InjectRepository(Vaccine)
        private vaccineRepository: Repository<Vaccine>,
    ) { }
    async createVaccine(vaccineDto: VaccineDto): Promise<Vaccine> {
        const vaccine = this.vaccineRepository.create(vaccineDto);
        return this.vaccineRepository.save(vaccine);
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