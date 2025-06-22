import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { Vaccine } from './entities/vaccine.entity';

@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Post('create')
  createVaccines(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccinesService.createVaccines(createVaccineDto);
  }

  @Get('all')
      async findAllVaccines(): Promise<Vaccine[]> {
          return this.vaccinesService.findAllVaccines();
    }

  @Get(':id')
  async findVaccineById(@Param('id') id: number): Promise<Vaccine> {
          return this.vaccinesService.findVaccineById(id);
      }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccineDto: UpdateVaccineDto) {
    return this.vaccinesService.updateVaccines(+id, updateVaccineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vaccinesService.deleteVaccine(id);
    }
}
