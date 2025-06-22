import { Injectable, NotFoundException } from '@nestjs/common';
import { Vaccines } from './vaccines.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccineDto } from './dto/vaccines.dto';


@Injectable()
export class VaccinesService {
constructor(
        @InjectRepository(Vaccines)
        private vaccineRepository: Repository<Vaccines>,
    ) {}
 
    async createVaccines(vaccineDto: VaccineDto): Promise<Vaccines> {
        const vaccine = this.vaccineRepository.create(vaccineDto);
        return this.vaccineRepository.save(vaccine);
    }
    
    async findAllVaccines(): Promise<Vaccines[]> {
        return this.vaccineRepository.find();
    }

    async findVaccineById(id: number): Promise<Vaccines> {
        const vaccine = await this.vaccineRepository.findOne({ where: { id } });
        if (!vaccine) {
            throw new NotFoundException(`Vaccine with ID ${id} not found`);
        }
        return vaccine;
}
async updateVaccines(id: number, vaccineDtoDto: VaccineDto): Promise<Vaccines> {
        await this.vaccineRepository.update(id, vaccineDtoDto);
        return this.findVaccineById(id);
    }

    async deleteVaccine(id: number): Promise<void> {
        const result = await this.vaccineRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Vaccine with ID ${id} not found`);
        }
    }
}