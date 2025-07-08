import { IsNotEmpty, IsEmpty } from 'class-validator';

export class PatientDto {

    @IsEmpty()
    mainPatientId: number;

    @IsNotEmpty()
    fullName?: string;

    @IsNotEmpty()
    address?: string;

    @IsNotEmpty()
    taxCode?: string;

    @IsEmpty()
    relationToMainPatient?: string;
}