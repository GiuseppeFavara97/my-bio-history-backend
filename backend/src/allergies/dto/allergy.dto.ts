import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class AllergyDto {
    @IsNotEmpty()
    id:number;
    id_patient:number;
    

    @IsDate()
    start_date:Date;
    end_date:Date;

    @IsString()
    allergen:string;
    reaction:string;
    severity:string;
    note:string;

}