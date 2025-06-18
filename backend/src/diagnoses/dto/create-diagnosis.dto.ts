import { IsDate, IsNotEmpty } from "class-validator";

export class CreateDiagnosisDto {
    
    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    description : string;
}
