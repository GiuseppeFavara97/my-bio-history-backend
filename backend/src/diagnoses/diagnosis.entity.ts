import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToMany, OneToMany, OneOrMore, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
// Quando sarà presente MedicalRecord import { MedicalRecord } from './medical-record.entity';
@Entity("diagnoses")
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;

    /* questa parte è dedicata alla creazione della foreign key
    ma senza le altre tabelle non son ho testato

    @ManyToOne(() => MedicalRecord, medicalrecords => medicalrecords.diagnoses)
        @JoinColumn({name: 'medical_records_id'}) // nome della chiave esterna nella tabella medical_records
        medicalrecord:MedicalRecord;
    
    @ManyToOne(() => Doctor, doctors => doctors.diagnoses)
        @JoinColumn ({name: 'doctors_id' }) //nome chiave esterna
    
    */
    @Column({ nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}