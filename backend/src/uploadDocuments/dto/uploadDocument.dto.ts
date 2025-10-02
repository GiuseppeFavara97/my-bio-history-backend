import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadDocumentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsNumber()
    size?: number;

    @IsOptional()
    @IsString()
    url?: string;

    @IsNotEmpty()
    @IsNumber()
    patientId: number;
}