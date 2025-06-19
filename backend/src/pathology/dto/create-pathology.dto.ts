import { IsDate, IsString, IsNumber } from "class-validator";

export class CreatePathologyDto {

    @IsDate()
    create_ai

    @IsString()
    name: string;
    
    @IsNumber()
    type: number;
}
