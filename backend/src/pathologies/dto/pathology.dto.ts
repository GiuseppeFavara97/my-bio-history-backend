import { IsString, IsNumber } from "class-validator";

export class PathologyDto {

    @IsString()
    name: string;

    @IsNumber()
    type: number;

    @IsString()
    description: string;
}
