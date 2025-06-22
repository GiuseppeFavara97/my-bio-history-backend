import { PartialType } from '@nestjs/mapped-types';
import { DoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(DoctorDto) {}
