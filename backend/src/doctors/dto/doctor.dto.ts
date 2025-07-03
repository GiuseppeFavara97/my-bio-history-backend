import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';

export class DoctorDto {

    user: User

    @IsNotEmpty()
    specializer: string;

    @IsNotEmpty()
    license_number: string;
}
