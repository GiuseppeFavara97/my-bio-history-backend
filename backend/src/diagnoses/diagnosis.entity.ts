import { Care } from "src/care/care.entity";
import { Doctor } from "src/doctors/doctor.entity";
import { MedicalRecord } from "src/medicalRecords/medical.entity";
import { Patient } from "src/patients/patient.entity";
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("diagnoses")
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    pathologyName: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Doctor, (doctor) => doctor.diagnosis)
    @JoinColumn({ name: "doctor_id" })
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient) => patient.diagnoses)
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

    @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.diagnoses)
    @JoinColumn({ name: "medical_record_id" })
    medicalRecords: MedicalRecord;

    @ManyToOne(() => Care, (care) => care.diagnosis)
    care: Care;

}