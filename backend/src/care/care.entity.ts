import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { MedicalRecord } from "src/medicalRecords/medical.entity";
import { Diagnosis } from "src/diagnoses/diagnosis.entity";
import { Doctor } from "src/doctors/doctor.entity";
import { Patient } from "src/patients/patient.entity";


@Entity("care")
export class Care {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column ({default: false})
    softDeleted: boolean;

    @Column({ nullable: true })
    duration_days: number;

    @Column({ nullable: true })
    daily_frequency: number;

    @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.care)
    @JoinColumn({ name: "diagnosis_id" })
    diagnosis: Diagnosis;

    @ManyToOne(() => MedicalRecord, medicalRecord => medicalRecord.cares)
    @JoinColumn({ name: "medical_record_id" })
    medicalRecord: MedicalRecord;

    @ManyToOne(() => Doctor, doctor => doctor.cares)
    @JoinColumn({ name: "doctor_id" })
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient) => patient.cares)
    @JoinColumn({ name: "patient_id" })
    patient: Patient;
}
