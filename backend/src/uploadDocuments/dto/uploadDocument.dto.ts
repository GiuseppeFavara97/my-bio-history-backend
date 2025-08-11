import { IsNotEmpty } from 'class-validator';

export class UploadDocumentDto {
    name?: string;
    type?: string;
    size?: number;
    url?: string;
    patientId: number;
}