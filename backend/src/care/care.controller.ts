import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { CareService } from './care.service';
import { CareDto } from './dto/care.dto';

@Controller('care')
export class CareController {
  constructor(private readonly careService: CareService) { }

  @Post('create')
  create(@Body() careDto: CareDto) {
    return this.careService.createcare(careDto);
  }

  @Get()
  findAll() {
    return this.careService.findAllcare();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careService.findOnecare(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() careDto: CareDto) {
    return this.careService.updatecare(+id, careDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careService.removecare(+id);
  }
}
