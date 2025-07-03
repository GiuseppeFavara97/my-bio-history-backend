import { Medical_Records } from "src/medical_records/medical.entity";
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToMany, OneToMany, OneOrMore, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
// Quando sarà presente MedicalRecord import { MedicalRecord } from './medical-record.entity';
@Entity("diagnoses")
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;

    
    @ManyToOne(() => Medical_Records, medicalrecords => medicalrecords.diagnoses)
     medicalrecord: Medical_Records;
    
    /*
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