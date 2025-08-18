import { Injectable, NotFoundException } from '@nestjs/common';
import { PathologyDto } from './dto/pathology.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pathology } from './pathology.entity';
@Injectable()
export class PathologyService {

  constructor(
    @InjectRepository(Pathology)
    private pathologyRepository: Repository<Pathology>
  ) { }

  async createpatho(pathologyDto: PathologyDto): Promise<Pathology> {
    const pathology = this.pathologyRepository.create(pathologyDto)
    return await this.pathologyRepository.save(pathology);
  }

  async findAllpatho(): Promise<Pathology[]> {
    return await this.pathologyRepository.find();
  }

  async findOnepatho(id: number): Promise<Pathology> {
    const patho = await this.pathologyRepository.findOne({ where: { id } });
    if (!patho) {
      throw new NotFoundException(`Pathology with ID ${id} not found`);
    }
    return patho;
  }

  async updatepatho(id: number, pathologyDto: PathologyDto): Promise<Pathology> {
    await this.pathologyRepository.update(id, pathologyDto);
    return this.findOnepatho(id);
  }

async softDeletePatho(id: number): Promise<Pathology> {
  const pathology = await this.pathologyRepository.findOne({ where: { id } });
  if (!pathology) {
    throw new NotFoundException(`Pathology with ID ${id} not found`);
  }
  pathology.softDeleted = true;
  await this.pathologyRepository.save(pathology);
  return pathology;
}

  async removepatho(id: number): Promise<void> {
    const pathotoremove = await this.pathologyRepository.delete(id);
    if (pathotoremove.affected === 0) {
      throw new NotFoundException(`Pathology ID: ${id} not found`)
    }
  }

}
