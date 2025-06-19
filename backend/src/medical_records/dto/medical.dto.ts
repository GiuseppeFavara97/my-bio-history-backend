import { IsNotEmpty, IsDate } from 'class-validator';

export class MedicalDto {
    @IsNotEmpty()
    id_patient:number;
    

    @IsDate()
    created_at:Date;
    deleted_at:Date;

    

}