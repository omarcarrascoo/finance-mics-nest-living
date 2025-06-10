import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Delinquency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;
}
