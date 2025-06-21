import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    birthday_place: string;

    @Column({ nullable: true })
    province: string;

    @Column({ type: 'char', length: 1, nullable: true })
    sex: 'M' | 'F' | null;

    @Column({ nullable: true })
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}


