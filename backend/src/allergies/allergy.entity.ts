
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Patient } from "../patients/patient.entity";
import { MedicalRecord } from "src/medicalRecords/medical.entity";

@Entity("allergies")
export class Allergy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    allergen: string;

    @Column({ nullable: true })
    reaction: string;

    @Column({ nullable: true })
    severity: string;

    @Column({ nullable: true })
    note: string;

    @CreateDateColumn()
    start_date: Date;

    @Column({ nullable: true })
    end_date: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Patient, (patient) => patient.allergies)
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

    @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.allergies)
    @JoinColumn({ name: "medicalRecord_id" })
    medicalRecord: MedicalRecord;

}
