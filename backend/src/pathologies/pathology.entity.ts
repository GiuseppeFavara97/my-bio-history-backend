import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToMany, OneToMany, OneOrMore, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("pathologies")

export class Pathology {
    @PrimaryGeneratedColumn()
    id: number ;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    type: number;

    @Column({nullable: true})
    description: string;
}
