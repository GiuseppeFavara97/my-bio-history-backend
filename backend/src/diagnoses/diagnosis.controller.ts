import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisDto } from './dto/diagnosis.dto';


@Controller('diagnoses')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) { }

  @Post('create')
  create(@Body() diagnosisDto: DiagnosisDto) {
    return this.diagnosisService.createDiagnosis(diagnosisDto);
  }

  @Get()
  findAll() {
    return this.diagnosisService.findAllDiagnosis();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diagnosisService.findOneDiagnosis(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() diagnosisDto: DiagnosisDto) {
    return this.diagnosisService.updateDiagnosis(id, diagnosisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.diagnosisService.removeDiagnosis(id);
  }
}
