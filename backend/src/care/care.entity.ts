import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { MedicalRecord } from "src/medicalRecords/medical.entity";
import { Diagnosis } from "src/diagnoses/diagnosis.entity";
import { Doctor } from "src/doctors/doctor.entity";


@Entity("care")
export class Care {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    duration_days: number;

    @Column({ nullable: true })
    daily_frequency: number;

    @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.care)
    diagnosis: Diagnosis;

    @ManyToOne(() => MedicalRecord, medicalRecord => medicalRecord.cares)
    medicalRecord: MedicalRecord;

    @ManyToOne(() => Doctor, doctor => doctor.cares)
    doctor: Doctor;
}
