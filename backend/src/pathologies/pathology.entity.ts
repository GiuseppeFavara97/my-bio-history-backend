import { Diagnosis } from "src/diagnoses/diagnosis.entity";
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne } from "typeorm";

@Entity("pathologies")

export class Pathology {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    type: number;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.pathology, { nullable: true })
    @JoinColumn({ name: 'diagnosis_id' })
    diagnosis: Diagnosis;
}
