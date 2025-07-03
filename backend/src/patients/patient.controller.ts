import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { PatientDto } from './dto/patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) { }
  @Post('create')
  async createPatient(@Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientService.createPatient(patientDto);
  }
  @Get()
  async findAllPatients(): Promise<Patient[]> {
    return this.patientService.findAllPatients();
  }
  @Get(':id')
  async findPatientById(@Param('id') id: number): Promise<Patient> {
    return this.patientService.findPatientById(id);
  }
  @Put(':id')
  async updatePatient(@Param('id') id: number, @Body() patientDto:
    Patient): Promise<Patient> {
    return this.patientService.updatePatient(id, patientDto);
  }
  @Delete(':id')
  async deletePatient(@Param('id') id: number): Promise<void> {
    return this.patientService.deletePatient(id);
  }
  @Get('mainPatient/:mainPatientId')
  async findPatientsByMainPatientId(@Param('mainPatientId') mainPatientId: number): Promise<Patient[]> {
    return this.patientService.findPatientsByMainPatientId(mainPatientId);
  }
  @Get('user/:userId')
  async findPatientsByUserId(@Param('userId') userId: number): Promise<Patient[]> {
    return this.patientService.findPatientsByUserId(userId);
  }
  @Get('fullName/:fullName')
  async findPatientsByFullName(@Param('fullName') fullName: string): Promise<Patient[]> {
    return this.patientService.findPatientsByFullName(fullName);
  }
  @Get('taxCode/:taxCode')
  async findPatientsByTaxCode(@Param('taxCode') taxCode: string): Promise<Patient[]> {
    return this.patientService.findPatientsByTaxCode(taxCode);
  }
  @Get('relation/:relationToMainPatient')
  async findPatientsByRelationToMainPatient(@Param('relationToMainPatient') relationToMainPatient: string): Promise<Patient[]> {
    return this.patientService.findPatientsByRelationToMainPatient(relationToMainPatient);
  }
}