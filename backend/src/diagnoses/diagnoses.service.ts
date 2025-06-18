import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { Diagnosis } from './entities/diagnosis.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class DiagnosesService {

  constructor(
          @InjectRepository(Diagnosis)
          private diagnosisRepository: Repository<Diagnosis>,
      ) {}

  async creatediagnosis(createDiagnosisDto: CreateDiagnosisDto): Promise<Diagnosis> {
    const Diagnosis = this.diagnosisRepository.create(createDiagnosisDto);
    return await this.diagnosisRepository.save(Diagnosis);
  }

  async findAlldiagnosis(): Promise <Diagnosis[]> {
    
    return await this.diagnosisRepository.find();
  }


  async findOnediagnosis(id: number): Promise <Diagnosis> {
    const diagnosis = await this.diagnosisRepository.findOne({ where: { id } });
            if (!diagnosis) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return diagnosis;
  }

  async updatediagnosis(id: number, updateDiagnosisDto: UpdateDiagnosisDto): Promise <Diagnosis> {
    await this.diagnosisRepository.update(id, updateDiagnosisDto);
    return this.findOnediagnosis(id);
  }

  async removediagnosis(id: number):Promise <void> {
    const darimuovere = await this.diagnosisRepository.delete(id);
    if (darimuovere.affected ===0) {
      throw new NotFoundException (`Utente ID: ${id} Non trovato` );
    }
  }
}
