import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from './allergy.entity';
import { AllergyService } from './allergy.service';
import { AllergyController } from './allergy.controller';
import { Patient } from 'src/patients/patient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Allergy, Patient])],
    providers: [AllergyService],
    controllers: [AllergyController],
})
export class AllergyModule { }