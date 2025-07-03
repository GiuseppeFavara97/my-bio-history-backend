<<<<<<< HEAD
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
=======
import { IsNotEmpty, IsEmail } from 'class-validator';

export class PatientDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    id_main_patient: number;
    @IsNotEmpty()
     id_users: number;
    @IsNotEmpty()
    full_name: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    tax_code: string;
   @IsNotEmpty()
    realtion_to_patient: string;
    @IsNotEmpty()
    deleted_at: Date;
    
        

    
        
        
    
>>>>>>> origin/main
}