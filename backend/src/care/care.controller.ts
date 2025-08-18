import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { CareService } from './care.service';
import { CareDto } from './dto/care.dto';

@Controller('care')
export class CareController {
  constructor(private readonly careService: CareService) { }

  @Post('create')
  create(@Body() careDto: CareDto) {
    return this.careService.createCare(careDto);
  }

  @Get()
  findAll() {
    return this.careService.findAllCare();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careService.findOneCare(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() careDto: CareDto) {
    return this.careService.updateCare(+id, careDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careService.deleteCare(+id);
  }
}
