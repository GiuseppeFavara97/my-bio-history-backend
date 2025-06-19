import { PartialType } from '@nestjs/mapped-types';
import { CreateCareDto } from './create-care.dto';
import { IsString, IsNumber } from 'class-validator';
export class UpdateCareDto extends PartialType(CreateCareDto) {
    
    @IsString()
        name: string;
        descrption: string;
        
    
        @IsNumber()
        duration_days: number;
        daily_frequency: number;
}
