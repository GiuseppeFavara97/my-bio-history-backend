import { Care } from "src/care/care.entity";
import { Doctor } from "src/doctors/doctor.entity";
import { MedicalRecord } from "src/medicalRecords/medical.entity";
import { Pathology } from "src/pathologies/pathology.entity";
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("diagnoses")
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Pathology, (pathology) => pathology.diagnosis)
    pathology: Pathology;

    @ManyToOne(() => Doctor, (doctor) => doctor.diagnosis)
    doctor: Doctor;

    @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.diagnoses)
    medicalRecords: MedicalRecord;

    @ManyToOne(() => Care, (care) => care.diagnosis)
    care: Care;

}