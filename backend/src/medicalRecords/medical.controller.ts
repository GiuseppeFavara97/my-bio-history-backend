
import { Controller, Post, Get, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { MedicalRecordService } from './medical.service';
import { MedicalRecord } from './medical.entity';
import { MedicalRecordDto } from './dto/medicalRecord.dto';

@Controller('medical')
export class MedicalRecordController {
    constructor(private medicalRecordService: MedicalRecordService) { }

    @Post('create')
    async createMedicalRecord(@Body() medicalRecordDto: MedicalRecordDto): Promise<MedicalRecord> {
        return this.medicalRecordService.createMedicalRecord(medicalRecordDto);
    }

    @Get()
    findAllMedicalRecords(): Promise<MedicalRecord[]> {
        return this.medicalRecordService.findAllMedicalRecords();
    }

    @Get('patient/:patientId')
    async getFullMedicalRecordByPatientId(@Param('patientId') patientId: number): Promise<MedicalRecord> {
        return this.medicalRecordService.getFullMedicalRecordByPatientId(patientId);
    }

    @Get(':id')
    async findMedicalRecordById(@Param('id') id: number): Promise<MedicalRecord> {
        return this.medicalRecordService.findMedicalRecordById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() medicalRecordDto: MedicalRecordDto): Promise<MedicalRecord> {
        return this.medicalRecordService.updateMedicalRecord(id, medicalRecordDto);
    }

    @Patch(':id')
    softDelete(@Param('id') id: number): Promise<MedicalRecord> {
        return this.medicalRecordService.softDeleteMedical(id);
    }
}