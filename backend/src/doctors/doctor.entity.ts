import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    JoinTable
} from "typeorm";

import { Exclude } from "class-transformer";
import { Patient } from "src/patients/patient.entity";
import { User } from "../users/user.entity";
import { Diagnosis } from "src/diagnoses/diagnosis.entity";
import { Care } from "src/care/care.entity";



@Entity("doctors")
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    specializer: string;

    @Column({ default: false })
    softDeleted: boolean;

    @Column()
    licenseNumber: string;

    @OneToOne(() => User, user => user.doctor)
    @JoinColumn({ name: 'user_id' })
    @Exclude()
    user: User;

    @OneToMany(() => Diagnosis, diagnosis => diagnosis.doctor)
    diagnosis: Diagnosis[];

    @ManyToMany(() => Patient, (patient) => patient.doctors)
    @JoinTable()
    patients: Patient[];

    @OneToMany(() => Care, care => care.doctor)
    cares: Care[];
}
