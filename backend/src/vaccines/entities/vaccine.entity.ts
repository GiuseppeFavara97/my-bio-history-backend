import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  vaccine_name: string;


  @Column()
  vaccine_type: string;

  @Column({ type: 'date' })
  vaccine_date: Date;

  @Column()
  vaccine_dose: number;

  @Column({ type: 'varchar' })
  note: string;

  @Column()
  paziente_id: number; // ID del paziente associato al vaccino

  @Column()
  medical_records_id: number; // Numero della cartella sanitaria

}

