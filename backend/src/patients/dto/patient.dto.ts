import { IsNotEmpty, IsEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class PatientDto {

    @Exclude()
    user: any;

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