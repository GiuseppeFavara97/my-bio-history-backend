import { IsString, } from "class-validator";

export class DiagnosisDto {

    description?: string;
    doctorId: number;
    patientId: number;
}