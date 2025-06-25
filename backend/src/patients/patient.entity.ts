import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("patients")
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    id_users: number;

    @Column({ nullable: true })
    specializer: string;

    @Column({ nullable: true })
    license_number: string;

}