import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PathologyService } from './pathology.service';
import { CreatePathologyDto } from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';

@Controller('pathology')
export class PathologyController {
  constructor(private readonly pathologyService: PathologyService) {}

  @Post()
  create(@Body() createPathologyDto: CreatePathologyDto) {
    return this.pathologyService.createpatho(createPathologyDto);
  }

  @Get()
  findAll() {
    return this.pathologyService.findAllpatho();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pathologyService.findOnepatho(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePathologyDto: UpdatePathologyDto) {
    return this.pathologyService.updatepatho(+id, updatePathologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pathologyService.removepatho(+id);
  }
}
