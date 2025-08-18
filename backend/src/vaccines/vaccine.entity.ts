import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from 'src/patients/patient.entity';
import { MedicalRecord } from 'src/medicalRecords/medical.entity';

@Entity("vaccines")
export class Vaccine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    vaccinationDate: Date;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    note: string;

    @Column ({default: false})
    softDeleted: boolean;

    @ManyToOne(() => Patient, (patient) => patient.vaccines)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.vaccine)
    @JoinColumn({ name: 'medicalRecord_id' })
    medicalRecord: MedicalRecord;
}