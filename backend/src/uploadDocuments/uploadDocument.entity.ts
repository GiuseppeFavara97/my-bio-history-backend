import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity('uploadDocuments')
export class UploadDocument {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    originalName: string;

    @Column()
    type: string;

    @Column()
    size: number;

    @Column()
    url: string;

    @Column({ name: 'patient_id' })
    patientId: number;

    @ManyToOne(() => Patient, { nullable: true })
    @JoinColumn({ name: 'patient_id' })
    patient?: Patient;

    @Column({ name: 'createdAt' })
    createdAt: Date;

    @Column({ name: 'softDeleted', default: false })
    softDeleted: boolean;

    @Column({ name: 'medicalRecord_id', nullable: true })
    medicalRecordId?: number;
}