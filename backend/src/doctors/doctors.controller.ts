
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/create-doctor.dto';


@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('create')
  async createdoctors(@Body() createDoctorDto: DoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get('all')
  async findAllDocotrs()  {
    return this.doctorsService.findAlldoctors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findDoctorsById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: DoctorDto) {
    return this.doctorsService.updateDoctor(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.removedoctor(+id);
  }
}
