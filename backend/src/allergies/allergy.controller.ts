
import { Controller, Post, Get, Put, Delete, Body, Param, Patch} from '@nestjs/common';
import { AllergyService } from './allergy.service';
import { Allergy } from './allergy.entity';
import { AllergyDto } from './dto/allergy.dto';

@Controller('allergies')
export class AllergyController {
    constructor(private allergyService: AllergyService) { }

    @Post('create')
    async createAllergy(@Body() allergyDto: AllergyDto): Promise<Allergy> {
        return this.allergyService.createAllergy(allergyDto);
    }

    @Get()
    async findAllAllergies(): Promise<Allergy[]> {
        return this.allergyService.findAllAllergies();
    }

    @Get(':id')
    async findAllergyById(@Param('id') id: number): Promise<Allergy> {
        return this.allergyService.findAllergyById(id);
    }

    @Put(':id')
    async updateAllergy(@Param('id') id: number, @Body() allergyDto: AllergyDto): Promise<Allergy> {
        return this.allergyService.updateAllergy(id, allergyDto);
    }

    @Delete(':id')
    async deleteAllergy(@Param('id') id: number): Promise<void> {
        return this.allergyService.deleteAllergy(id);
    }

    @Patch(':id')
    async softDeleteAllergy(@Param('id') id: number): Promise<Allergy> {
        return this.allergyService.softDeleteAllergy(id);
    }
}