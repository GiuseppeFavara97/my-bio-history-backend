import { IsNotEmpty, IsEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';

export class PatientDto {

    user: User;

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