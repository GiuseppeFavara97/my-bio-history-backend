import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MedicalRecord } from 'src/medicalRecords/medical.entity';
import { Patient } from 'src/patients/patient.entity';

@Entity('uploadDocuments')
export class UploadDocument {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    type: string;
    @Column({ nullable: true })
    size: number;
    @Column({ nullable: true })
    url: string;
    @Column({ nullable: true })
    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.uploadDocument)
    @JoinColumn({ name: 'medicalRecord_id' })
    medicalRecord: MedicalRecord;

    @ManyToOne(() => Patient, (patient) => patient.uploadDocuments)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;
}