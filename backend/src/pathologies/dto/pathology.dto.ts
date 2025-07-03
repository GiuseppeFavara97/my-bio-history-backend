import { IsString, IsNumber } from "class-validator";

export class PathologyDto {

    name?: string;
    type?: number;
    description?: string;
    diagnosisId: number;
}
