<<<<<<< HEAD
import { Care } from "src/care/care.entity";
import { Doctor } from "src/doctors/doctor.entity";
import { MedicalRecord } from "src/medicalRecords/medical.entity";
import { Pathology } from "src/pathologies/pathology.entity";
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

=======
import { Medical_Records } from "src/medical_records/medical.entity";
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToMany, OneToMany, OneOrMore, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
// Quando sarà presente MedicalRecord import { MedicalRecord } from './medical-record.entity';
>>>>>>> origin/main
@Entity("diagnoses")
export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;

<<<<<<< HEAD
=======
    
    @ManyToOne(() => Medical_Records, medicalrecords => medicalrecords.diagnoses)
     medicalrecord: Medical_Records;
    
    /*
    @ManyToOne(() => Doctor, doctors => doctors.diagnoses)
        @JoinColumn ({name: 'doctors_id' }) //nome chiave esterna
    
    */
>>>>>>> origin/main
    @Column({ nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Care, (care) => care.diagnosis)
    care: Care[];

    @OneToMany(() => Pathology, (pathology) => pathology.diagnosis)
    pathology: Pathology[];

    @ManyToOne(() => Doctor, (doctor) => doctor.diagnosis, { nullable: true })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;

    @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.diagnosis, { nullable: true })
    @JoinColumn({ name: 'medicalRecord_id' })
    medicalRecords: MedicalRecord;

}