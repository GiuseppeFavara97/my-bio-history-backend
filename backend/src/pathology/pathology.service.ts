import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePathologyDto } from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pathology} from './entities/pathology.entity';
@Injectable()
export class PathologyService {

  constructor(
    @InjectRepository(Pathology)
    private pathologyRepository: Repository<Pathology>
  ){}

  async createpatho(createPathologyDto: CreatePathologyDto):Promise <Pathology> {
    // Check if a pathology with the same name already exists
    const {id} = createPathologyDto;
    const check= await this.pathologyRepository.findOne({
      where: { id },
    });

    if (check) {
      throw new BadRequestException('Il campo esiste già')
    }
    else {
    const pathology = this.pathologyRepository.create(createPathologyDto)
    return await this.pathologyRepository.save(pathology);
  }
  }




  async findAllpatho():Promise <Pathology[]> {
    return await this.pathologyRepository.find();
  }

  async findOnepatho(id: number):Promise <Pathology> {
    const patho = await this.pathologyRepository.findOne ({ where: { id}});
      if (!patho) {
      throw new NotFoundException(`Pathology with ID ${id} not found`);
  }
  return patho;
}

  async updatepatho(id: number, updatePathologyDto: UpdatePathologyDto):Promise <Pathology> {
    await this.pathologyRepository.update(id, updatePathologyDto);
    return this.findOnepatho(id);    
  }

  async removepatho(id: number):Promise <void> {
    const pathotoremove = await this.pathologyRepository.delete(id);
    if (pathotoremove.affected === 0) {
      throw new NotFoundException(`Pathology ID: ${id} not found`)
    }
  }
  
}
