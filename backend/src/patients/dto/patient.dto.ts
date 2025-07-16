import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmpty } from 'class-validator';

export class PatientDto {

    @Exclude()
    user: any;
    @IsEmpty()
    mainPatientId: number;

    @IsNotEmpty()
    fullName?: string;

    @IsNotEmpty()
    address?: string;

    @IsEmpty()
    relationToMainPatient?: string;
}