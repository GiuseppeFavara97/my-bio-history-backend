import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    JoinColumn,
    OneToOne
} from 'typeorm';

import { User } from '../users/user.entity';
import { Allergy } from '../allergies/allergy.entity';
import { Vaccine } from '../vaccines/vaccine.entity';
import { UploadDocument } from '../uploadDocuments/uploadDocument.entity';
import { MedicalRecord } from '../medicalRecords/medical.entity';
import { Exclude } from 'class-transformer';

@Entity("patients")
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    mainPatientId: number;

    @Column({ nullable: true })
    userId: number;

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    address: string;


    @Column({ nullable: true })
    relationToMainPatient: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Allergy, (allergy) => allergy.patient)
    allergies: Allergy[];

    @OneToMany(() => Vaccine, (vaccine) => vaccine.patient)
    vaccines: Vaccine[];

    @OneToMany(() => UploadDocument, (uploadDocument) => uploadDocument.patient)
    uploadDocuments: UploadDocument[];

    @OneToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
    @JoinColumn({ name: 'medicalRecord_id' })
    medicalRecord: MedicalRecord;

    @OneToOne(() => User, user => user.patient)
    @JoinColumn({ name: 'userId' })
    @Exclude()
    user: User;
}