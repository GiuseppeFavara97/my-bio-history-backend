import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medical_Records } from './medical.entity';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Medical_Records])],
    providers: [MedicalService],
    controllers: [MedicalController],
})
export class MedicalModule { }