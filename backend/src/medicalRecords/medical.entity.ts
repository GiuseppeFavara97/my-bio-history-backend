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
import { Care } from "src/care/care.entity";


@Entity("medicalRecords")
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ default: false })
    softDeleted: boolean;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(() => Patient, (patient) => patient.medicalRecord)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @OneToMany(() => UploadDocument, (uploadDocument) => uploadDocument.medicalRecord)
    uploadDocuments: UploadDocument[];

    @OneToMany(() => Allergy, (allergy) => allergy.medicalRecord)
    allergies: Allergy[];

    @OneToMany(() => Vaccine, (vaccine) => vaccine.medicalRecord)
    vaccines: Vaccine[];

    @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.medicalRecords)
    diagnoses: Diagnosis[];

    @OneToMany(() => Care, (care) => care.medicalRecord)
    cares: Care[];
}