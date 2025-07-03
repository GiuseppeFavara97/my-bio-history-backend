import { Diagnosis } from "src/diagnoses/diagnosis.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany} from "typeorm";

@Entity("medical_records")
export class Medical_Records {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_patient: number;

    @CreateDateColumn()
    created_At: Date;

    @DeleteDateColumn()
    deleted_At: Date;

    @UpdateDateColumn()
    update:Date;

    @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.medicalrecord)
    diagnoses: Diagnosis[]
}


