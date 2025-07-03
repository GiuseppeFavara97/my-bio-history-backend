import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

@Module({
<<<<<<< HEAD
    imports: [TypeOrmModule.forFeature([Patient])],
    providers: [PatientService],
    controllers: [PatientController],
    exports: [PatientService],
=======

  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientService],
  controllers: [PatientController]
>>>>>>> origin/main
})
export class PatientModule { }