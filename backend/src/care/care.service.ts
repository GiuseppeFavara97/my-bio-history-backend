import { Injectable, NotFoundException } from '@nestjs/common';
import { CareDto } from './dto/care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Care } from './care.entity';

@Injectable()
export class CareService {
  constructor(
    @InjectRepository(Care)
    private careRepository: Repository<Care>,
  ) { }
  // This service is responsible for managing care entities.
  async createcare(careDto: CareDto): Promise<Care> {
    const care = this.careRepository.create(careDto);
    return await this.careRepository.save(care);
  }

  async findAllcare(): Promise<Care[]> {
    return await this.careRepository.find();
  }

  async findOnecare(id: number) {
    const care = await this.careRepository.findOne({ where: { id } });
    if (!care) {
      throw new NotFoundException(`Care with ID ${id} not found`);
    }
    return care;
  }

  async updatecare(id: number, careDto: CareDto): Promise<Care> {
    await this.careRepository.update(id, careDto);
    return this.findOnecare(id);
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

  async removecare(id: number): Promise<void> {
    const caredarimuovere = await this.careRepository.delete(id);
    if (caredarimuovere.affected === 0) {
      throw new NotFoundException(`Care ID: ${id} not found`);
    }

  }
}
