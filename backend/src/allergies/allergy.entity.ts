
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("allergies")
export class Allergy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    medical_records: number;

    @Column({ unique: true })
    id_patient: number;

    @Column({nullable: true})
    allergen: string;

    @Column({nullable: true})
    reaction: string;

    @Column({nullable: true})
    severity: string;

    @Column({nullable: true})
    note: string;

    @Column({nullable: true})
    start_date: Date;

    @Column({nullable: true})
    end_date: Date;

   @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
