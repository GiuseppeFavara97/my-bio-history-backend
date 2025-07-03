
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import { Patient } from './patient.entity';


@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) { }

  @Post('create')
  async createpatient(@Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientService.createPatient(patientDto);
  }

  @Get('all')
  async findAllpatients(): Promise<Patient[]> {
    return this.patientService.findAllpatients();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findPatientsById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientService.updatepatient(+id, patientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientService.removepatient(+id);
  }
}