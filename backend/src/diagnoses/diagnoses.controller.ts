import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Controller('diagnoses')
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosesService.creatediagnosis(createDiagnosisDto);
  }

  @Get()
  findAll() {
    return this.diagnosesService.findAlldiagnosis();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosesService.findOnediagnosis(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.diagnosesService.updatediagnosis(+id, updateDiagnosisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosesService.removediagnosis(+id);
  }
}
