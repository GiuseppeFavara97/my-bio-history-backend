import { IsNumber, IsString } from "class-validator";

export class CareDto {

    @IsString()
    name: string;
    description: string;


    @IsNumber()
    duration_days: number;
    daily_frequency: number;
    diagnosisId: number;
    doctorId: number;
    patientId: number;

}
