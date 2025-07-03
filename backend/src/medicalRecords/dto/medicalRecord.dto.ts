import { IsNotEmpty, IsNumber } from 'class-validator';

export class MedicalRecordDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;

}