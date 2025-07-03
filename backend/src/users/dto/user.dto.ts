import {
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsDateString,
    MinLength,
    IsString,
    Matches,
    IsEnum
} from 'class-validator';
import { UserSex } from '../enum/userSex.enum';
import { UserRole } from '../enum/userRole.enum';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DoctorDto } from '../../doctors/dto/doctor.dto';
import { PatientDto } from '../../patients/dto/patient.dto';

export class UserDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    @IsDateString()
    birthday?: Date;

    @IsOptional()
    province?: string;

    @IsOptional()
    @IsEnum(UserSex)
    sex?: UserSex;

    @IsOptional()
    birthdayPlace?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\+?[0-9]{7,15}$/, { message: 'Phone number is not valid' })
    phoneNumber?: string;

    @IsEnum(UserRole)
    role?: UserRole;

    @ValidateNested()
    @Type(() => DoctorDto)
    @IsOptional()
    doctorData?: DoctorDto;

    @ValidateNested()
    @Type(() => PatientDto)
    @IsOptional()
    patientData?: PatientDto;
}
