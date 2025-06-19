import { IsNotEmpty } from 'class-validator';

export class MedicalDto {
    @IsNotEmpty()
    id_patient:number;
    
    

}