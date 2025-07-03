import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Patient } from "../patients/patient.entity";
import { Doctor } from "src/doctors/doctor.entity";
import { UserRole } from "./enum/userRole.enum";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    birthdayPlace: string;

    @Column({ nullable: true })
    province: string;

    @Column({ type: 'char', length: 1, nullable: true })
    sex: 'M' | 'F' | null;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Patient, (patient) => patient.user)
    @JoinColumn({ name: 'patient_id' })
    patient?: Patient;

    @OneToOne(() => Doctor, (doctor) => doctor.user)
    @JoinColumn({ name: 'doctor_id' })
    doctor?: Doctor;
}


