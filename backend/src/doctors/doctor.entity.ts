import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Diagnosis } from "src/diagnoses/diagnosis.entity";
import { MedicalRecord } from "src/medicalRecords/medical.entity";
import { Exclude } from "class-transformer";



@Entity("doctors")
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    specializer: string;

    @Column({ default: false })
    softDeleted: boolean;

    @Column()
    licenseNumber: string;

    @OneToOne(() => User, user => user.doctor)
    @JoinColumn({ name: 'user_id' })
    @Exclude()
    user: User;

    @OneToMany(() => Diagnosis, diagnosis => diagnosis.doctor)
    diagnosis: Diagnosis[];

    @ManyToOne(() => MedicalRecord, medicalRecord => medicalRecord.doctor)
    @JoinColumn({ name: 'medicalRecord_id' })
    medicalRecord: MedicalRecord;

}
