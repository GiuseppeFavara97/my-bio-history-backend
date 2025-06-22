import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity("Doctors")
export class Doctor {
 @PrimaryGeneratedColumn()
id: number;

@Column({nullable: true})
id_users: number;

@Column()
speicalizer: string;

@Column()
license_number: string;

}
