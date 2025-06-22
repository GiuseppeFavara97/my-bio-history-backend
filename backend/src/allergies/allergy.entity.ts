
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("allergies")
export class Allergy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    medical_recordsID: number;

    @Column()
    id_patient: number;

    @Column({ nullable: true })
    allergen: string;

    @Column({ nullable: true })
    reaction: string;

    @Column({ nullable: true })
    severity: string;

    @Column({ nullable: true })
    note: string;

    @CreateDateColumn()
    start_date: Date;

    @Column({ nullable: true })
    end_date: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
