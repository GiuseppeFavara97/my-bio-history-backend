
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class VaccineDto {

    name?: string;
    vaccinationDate?: Date;
    type?: string;
    note?: string;
    patientId: number;
}