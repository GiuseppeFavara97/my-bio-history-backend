
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './doctor.entity';


@Controller('doctors')
export class DoctorController {
  constructor(private doctorService: DoctorService) { }

  @Post('create')
  async createdoctors(@Body() doctorDto: DoctorDto): Promise<Doctor> {
    return this.doctorService.createdoctor(doctorDto);
  }

  @Get('all')
  async findAllDocotrs(): Promise<Doctor[]> {
    return this.doctorService.findAlldoctors();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findDoctorsById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() doctorDto: DoctorDto): Promise<Doctor> {
    return this.doctorService.updateDoctor(+id, doctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doctorService.removedoctor(+id);
  }
}
