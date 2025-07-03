import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { Vaccine } from './vaccine.entity';
import { VaccineDto } from './dto/vaccine.dto';

@Controller('vaccines')
export class VaccineController {
    constructor(private readonly vaccineService: VaccineService) { }
    @Post('create')
    async createVaccine(@Body() vaccineDto: VaccineDto): Promise<Vaccine> {
        return this.vaccineService.createVaccine(vaccineDto);
    }
    @Get()
    async findAllVaccines(): Promise<Vaccine[]> {
        return this.vaccineService.findAllVaccines();
    }
    @Get(':id')
    async findVaccineById(@Param('id') id: number): Promise<Vaccine> {
        return this.vaccineService.findVaccineById(id);
    }
    @Put(':id')
    async updateVaccine(@Param('id') id: number, @Body() vaccineDto: VaccineDto,
    ): Promise<Vaccine> {
        return this.vaccineService.updateVaccine(id, vaccineDto);
    }
    @Delete(':id')
    async deleteVaccine(@Param('id') id: number): Promise<void> {
        return this.vaccineService.deleteVaccine(id);
    }
}