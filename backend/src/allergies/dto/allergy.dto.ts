import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class AllergyDto {
    @IsNotEmpty()
    id_patient: number;
    medical_recordsID: number;

    @IsString()
    allergen: string;
    reaction: string;
    severity: string;
    note: string;

}