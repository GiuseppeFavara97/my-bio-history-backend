
import { IsNotEmpty, IsDate } from 'class-validator';
export class CreateVaccineDto {   
    @IsNotEmpty()
    vaccine_name: string;
    
    @IsDate()
    vaccine_date: Date;    
}
