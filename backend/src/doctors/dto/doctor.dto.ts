import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DoctorDto {

    @Exclude()
    user: any;

    @IsNotEmpty()
    specializer: string;

    @IsNotEmpty()
    licenseNumber: string;
}
