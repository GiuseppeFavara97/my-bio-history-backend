
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { MedicalService } from './medical.service';
import { Medical_Records } from './medical.entity';
import { MedicalDto } from './dto/medical.dto';

@Controller('medical')
export class MedicalController {
    constructor(private MedicalService: MedicalService) {}

    @Post('create')
    async createMedical_Records(@Body() medicalDto: MedicalDto): Promise<Medical_Records> {
        return this.MedicalService.createMedical_Records(medicalDto);
    }

    @Get('all')
    async findAllMedical_Records(): Promise<Medical_Records[]> {
        return this.MedicalService.findAllMedical_Records();
    }

    @Get(':id')
    async findMedical_RecordsById(@Param('id') id: number): Promise<Medical_Records> {
        return this.MedicalService.findMedical_RecordsById(id);
    }

    @Put(':id')
    async updateMedical_Records(@Param('id') id: number, @Body() MedicalDto: MedicalDto): Promise<Medical_Records> {
        return this.MedicalService.updateMedical_Records(id, MedicalDto);
    }

    @Delete(':id')
    async deleteMedical_Records(@Param('id') id: number): Promise<void> {
        return this.MedicalService.deleteMedical_Records(id);
    }
}