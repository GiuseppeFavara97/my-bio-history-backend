
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/doctor.dto';


@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) { }

  @Post('create')
  async createdoctors(@Body() createDoctorDto: DoctorDto) {
    return this.doctorsService.createdoctor(createDoctorDto);
  }

  @Get('all')
  async findAllDocotrs() {
    return this.doctorsService.findAlldoctors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findDoctorsById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: DoctorDto) {
    return this.doctorsService.updateDoctor(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.removedoctor(+id);
  }
}
