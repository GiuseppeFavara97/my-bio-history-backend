import { Injectable, NotFoundException } from '@nestjs/common';
import { Medical_Records } from './medical.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalDto } from './dto/medical.dto';
 

@Injectable()
export class MedicalService {
    constructor(
        @InjectRepository(Medical_Records)
        private MedicalRepository: Repository<Medical_Records>,
    ) {}
 
    async createMedical_Records(MedicalDto: MedicalDto): Promise<Medical_Records> {
        const Medical_Records = this.MedicalRepository.create(MedicalDto);
        return this.MedicalRepository.save(Medical_Records);
    }
    
    async findAllMedical_Records(): Promise<Medical_Records[]> {
        return this.MedicalRepository.find();
    }

    async findMedical_RecordsById(id: number): Promise<Medical_Records> {
        const Medical_Records = await this.MedicalRepository.findOne({ where: { id } });
        if (!Medical_Records) {
            throw new NotFoundException(`Medical_Records with ID ${id} not found`);
        }
        return Medical_Records;
    }

    async updateMedical_Records(id: number, MedicalDto: MedicalDto): Promise<Medical_Records> {
        await this.MedicalRepository.update(id, MedicalDto);
        return this.findMedical_RecordsById(id);
    }

    async deleteMedical_Records(id: number): Promise<void> {
        const result = await this.MedicalRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Medical_Records with ID ${id} not found`);
        }
    }
}
