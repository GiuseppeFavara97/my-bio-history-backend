import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Patient } from "../patients/patient.entity";
import { Doctor } from "src/doctors/doctor.entity";
import { UserRole } from "./enum/userRole.enum";
import { UserSex } from "./enum/userSex.enum";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    username: string;

    @Column({ nullable: true })
    resetOtp: string;

    @Column({ type: 'timestamp', nullable: true })
    resetOtpExpires: Date;

    @Column({ unique: true, nullable: true })
    taxCode: string;

    @Column({ default: false })
    softDeleted: boolean;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: Date;

    @Column()
    birthdayPlace: string;

    @Column()
    province: string;

    @Column({ nullable: true })
    profileImageUrl?: string;

    @Column({ type: 'enum', enum: UserSex })
    sex: UserSex;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PATIENT,
    })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Patient, patient => patient.user)
    patient: Patient;

    @OneToOne(() => Doctor, doctor => doctor.user)
    doctor: Doctor;

}