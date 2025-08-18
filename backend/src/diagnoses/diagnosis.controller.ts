import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisDto } from './dto/diagnosis.dto';


@Controller('diagnoses')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) { }

  @Post('create')
  create(@Body() diagnosisDto: DiagnosisDto) {
    return this.diagnosisService.creatediagnosis(diagnosisDto);
  }

  @Get('all')
  findAll() {
    return this.diagnosisService.findAlldiagnosis();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diagnosisService.findOnediagnosis(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() diagnosisDto: DiagnosisDto) {
    return this.diagnosisService.updatediagnosis(+id, diagnosisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.diagnosisService.removediagnosis(id);
  }

  @Patch(':id')
  softDeleted(@Param('id') id: number) {
    return this.diagnosisService.softDeleteDiagnosis(id);
  }
}
