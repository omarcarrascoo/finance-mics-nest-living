import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('condos')
export class Condo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address?: string;
}
