import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PathologyService } from './pathology.service';
import { PathologyDto } from './dto/pathology.dto';


@Controller('pathologies')
export class PathologyController {
  constructor(private readonly pathologyService: PathologyService) { }

  @Post('create')
  create(@Body() pathologyDto: PathologyDto) {
    return this.pathologyService.createpatho(pathologyDto);
  }

  @Get('all')
  findAll() {
    return this.pathologyService.findAllpatho();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pathologyService.findOnepatho(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() pathologyDto: PathologyDto) {
    return this.pathologyService.updatepatho(+id, pathologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pathologyService.removepatho(+id);
  }
}
