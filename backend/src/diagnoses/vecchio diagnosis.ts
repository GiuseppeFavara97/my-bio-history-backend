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
    @Column({nullable: true})
    date: Date;
    @Column({nullable: true})
    description : string;
}



/*
ipotetica classe Medical Record
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Diagnosis } from './diagnoses.entity';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Diagnosis, diagnosis => diagnosis.medicalRecord)
  diagnoses: Diagnosis[];
} */