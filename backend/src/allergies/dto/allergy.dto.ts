import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class AllergyDto {

    allergen?: string;
    reaction?: string;
    severity?: string;
    note?: string;
    start_date?: Date;
    end_date?: Date;
    patientId: number;
    medicalRecordId: number;

}