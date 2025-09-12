import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { PatientDto } from './dto/patient.dto';
import { AuthGuard } from '../auth/auth.guard'; // Importa il guard

@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) { }

  @Post('create')
  @UseGuards(AuthGuard) // Aggiungi autenticazione
  async createPatient(@Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientService.createPatient(patientDto);
  }

  @Get()
  @UseGuards(AuthGuard) // Proteggi anche questo se necessario
  async findAllPatients(): Promise<Patient[]> {
    return this.patientService.findAllPatients();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findPatientById(@Param('id') id: number): Promise<Patient> {
    return this.patientService.findPatientById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePatient(@Param('id') id: number, @Body() patientDto: Patient): Promise<Patient> {
    return this.patientService.updatePatient(id, patientDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePatient(@Param('id') id: number): Promise<Patient> {
    return this.patientService.softDeletePatient(id);
  }

  @Get('mainPatient/:mainPatientId')
  @UseGuards(AuthGuard)
  async findPatientsByMainPatientId(@Param('mainPatientId') mainPatientId: number): Promise<Patient[]> {
    return this.patientService.findPatientsByMainPatientId(mainPatientId);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  async findPatientsByUserId(@Param('userId') userId: number): Promise<Patient[]> {
    return this.patientService.findPatientsByUserId(userId);
  }

  @Get('fullName/:fullName')
  @UseGuards(AuthGuard)
  async findPatientsByFullName(@Param('fullName') fullName: string): Promise<Patient[]> {
    return this.patientService.findPatientsByFullName(fullName);
  }

  @Get('relation/:relationToMainPatient')
  @UseGuards(AuthGuard)
  async findPatientsByRelationToMainPatient(@Param('relationToMainPatient') relationToMainPatient: string): Promise<Patient[]> {
    return this.patientService.findPatientsByRelationToMainPatient(relationToMainPatient);
  }
}