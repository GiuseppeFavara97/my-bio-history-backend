import { IsEmpty, IsNotEmpty } from 'class-validator';

export class DoctorDto {
    @IsNotEmpty()
    id_users: number;

    @IsEmpty()
    specializer: string;

    @IsEmpty()
    license_number: string;
}
