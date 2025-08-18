import { Diagnosis } from "src/diagnoses/diagnosis.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity("care")
export class Care {

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne.

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column ({default: false})
    softDeleted: boolean;

    @Column({ nullable: true })
    duration_days: number;

    @Column({ nullable: true })
    daily_frequency: number;

    @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.care)
    @JoinColumn({ name: 'diagnosis_id' })
    diagnosis: Diagnosis;
}
