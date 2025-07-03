import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';

export class PatientDto {

    user: User;

    @IsNotEmpty()
    mainPatientId: number;

    @IsNotEmpty()
    fullName?: string;

    @IsNotEmpty()
    address?: string;

    @IsNotEmpty()
    taxCode?: string;

    @IsNotEmpty()
    relationToMainPatient?: string;
}