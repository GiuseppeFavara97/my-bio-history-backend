import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("doctors")
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_users: number;

    @Column()
    specializer: string;

    @Column()
    license_number: string;

}
