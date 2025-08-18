import { Injectable, NotFoundException } from '@nestjs/common';
import { Allergy } from './allergy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergyDto } from './dto/allergy.dto';

@Injectable()
export class AllergyService {
    constructor(
        @InjectRepository(Allergy)
        private allergyRepository: Repository<Allergy>,
    ) { }

    async createAllergy(allergysDto: AllergyDto): Promise<Allergy> {
        const allergy = this.allergyRepository.create(allergysDto);
        return this.allergyRepository.save(allergy);
    }

    async findAllAllergies(): Promise<Allergy[]> {
        return this.allergyRepository.find();
    }

    async findAllergyById(id: number): Promise<Allergy> {
        const allergy = await this.allergyRepository.findOne({ where: { id } });
        if (!allergy) {
            throw new NotFoundException(`Allergy with ID ${id} not found`);
        }
        return allergy;
    }

    async updateAllergy(id: number, allergyDto: AllergyDto): Promise<Allergy> {
        await this.allergyRepository.update(id, allergyDto);
        return this.findAllergyById(id);
    }

    async softDeleteAllergy(id: number): Promise<Allergy> {
      const allergy = await this.allergyRepository.findOne({ where: { id } });
      if (!allergy) {
        throw new NotFoundException(`Pathology with ID ${id} not found`);
      }
      allergy.softDeleted = true;
      await this.allergyRepository.save(allergy);
      return allergy;
    }
    
    async deleteAllergy(id: number): Promise<void> {
        const result = await this.allergyRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Allergy with ID ${id} not found`);
        }
    }
}
