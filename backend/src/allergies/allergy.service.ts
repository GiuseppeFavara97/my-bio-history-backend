import { Injectable, NotFoundException } from '@nestjs/common';
import { Allergy } from './allergy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergyDto } from './dto/allergy.dto';
import { Patient } from 'src/patients/patient.entity';

@Injectable()
export class AllergyService {
    constructor(
        @InjectRepository(Allergy)
        private allergyRepository: Repository<Allergy>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) { }

    async createAllergy(allergysDto: AllergyDto): Promise<Allergy> {
        const patient = await this.patientRepository.findOne({
            where: { id: allergysDto.patientId },
            relations: ["medicalRecord"]
        });

        if (!patient) {
            throw new NotFoundException(`Patient with ID ${allergysDto.patientId} not found`);
        }
        const allergy = this.allergyRepository.create({
            allergen: allergysDto.allergen,
            reaction: allergysDto.reaction,
            severity: allergysDto.severity,
            note: allergysDto.note,
            patient: { id: patient.id },
            medicalRecord: { id: patient.medicalRecord.id }
        });
        this.allergyRepository.save(allergy);
        return allergy;
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
