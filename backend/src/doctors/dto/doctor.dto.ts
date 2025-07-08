import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class DoctorDto {

    @Exclude()
    user: any;

    @IsNotEmpty()
    specializer: string;

    @IsNotEmpty()
    licenseNumber: string;
}
