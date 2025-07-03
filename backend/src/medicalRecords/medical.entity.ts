import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Doctor } from "../doctors/doctor.entity";
import { UploadDocument } from "../uploadDocuments/uploadDocument.entity";
import { Allergy } from "../allergies/allergy.entity";
import { Vaccine } from "../vaccines/vaccine.entity";
import { Diagnosis } from "../diagnoses/diagnosis.entity";
import { Patient } from "src/patients/patient.entity";

@Entity("medicalRecords")
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => Doctor, (doctor) => doctor.medicalRecord)
    doctor: Doctor[];

    @OneToOne(() => Patient, (patient) => patient.medicalRecord)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @OneToMany(() => UploadDocument, (uploadDocument) => uploadDocument.medicalRecord)
    uploadDocument: UploadDocument[];

    @OneToMany(() => Allergy, (allergy) => allergy.medicalRecords)
    allergy: Allergy[];

    @OneToMany(() => Vaccine, (vaccine) => vaccine.medicalRecord)
    vaccine: Vaccine[];

    @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.medicalRecords)
    diagnosis: Diagnosis[];
}