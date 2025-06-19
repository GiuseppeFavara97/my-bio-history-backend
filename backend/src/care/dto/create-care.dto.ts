import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCareDto {

    @IsString()
    name: string;
    descrption: string;
    

    @IsNumber()
    duration_days: number;
    daily_frequency: number;

}
