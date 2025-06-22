import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccineDto } from './create-vaccine.dto';
import { IsNotEmpty, IsDate } from 'class-validator';

export class UpdateVaccineDto extends PartialType(CreateVaccineDto) {
    @IsNotEmpty()
    vaccine_name: string;
    
    @IsDate()
    vaccine_date: Date;

}
