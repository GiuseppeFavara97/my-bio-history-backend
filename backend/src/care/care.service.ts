import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCareDto } from './dto/create-care.dto';
import { UpdateCareDto } from './dto/update-care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Care } from './entities/care.entity';

@Injectable()
export class CareService {
    constructor(
      @InjectRepository(Care)
      private CareRepository: Repository<Care>,
    ){}
  // This service is responsible for managing care entities.
  async createcare(createCareDto: CreateCareDto): Promise<Care>{
    const care = this.CareRepository.create(createCareDto);
    return await this.CareRepository.save(care);
  }

  async findAllcare(): Promise <Care[]> {
    return await this.CareRepository.find();
  }

  async findOnecare(id: number) {
    const care=await  this.CareRepository.findOne({ where: { id}});
      if (!care) {
        throw new NotFoundException(`Care with ID ${id} not found`);
      }
      return care;
  }

  async updatecare(id: number, updateCareDto: UpdateCareDto): Promise<Care>{
   await this.CareRepository.update(id, updateCareDto);
   return this.findOnecare(id);
  }

  async removecare(id: number):Promise <void> {
    const caredarimuovere = await this.CareRepository.delete(id);
      if (caredarimuovere.affected === 0) {
        throw new NotFoundException(`Care ID: ${id} not found`);
        }

  }
}
