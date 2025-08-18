import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmpty } from 'class-validator';

export class PatientDto {

    @IsEmpty()
    mainPatientId: number;

    @IsNotEmpty()
    fullName?: string;

    @IsNotEmpty()
    address?: string;

    @IsEmpty()
    relationToMainPatient?: string;
}