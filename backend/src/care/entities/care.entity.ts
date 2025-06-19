import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("care")
export class Care {

    @PrimaryGeneratedColumn()
    id:number;

    // @ManyToOne.

    @Column({ nullable: true })
    name: string;
    
    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    duration_days: number;

    @Column({ nullable: true })
    daily_frequency:number;

}
