import { IsString, } from "class-validator";

export class DiagnosisDto {

    @IsString()
    description: string;
}