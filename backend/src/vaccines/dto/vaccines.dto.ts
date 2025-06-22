import { IsNotEmpty, IsDate } from 'class-validator';

export class VaccineDto {
    @IsNotEmpty()
    vaccine_name: string;

    @IsDate()
    vaccine_date: Date;

}