import { IsNotEmpty } from 'class-validator';

export class DoctorDto {

    @IsNotEmpty()
    specializer: string;

    @IsNotEmpty()
    licenseNumber: string;
}
