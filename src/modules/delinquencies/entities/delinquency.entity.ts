import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';

@Entity()
export class Delinquency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Resident, (r) => r.delinquencies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resident_id' })
  resident: Resident;

  @Column({ name: 'resident_id', type: 'text' })
  residentId: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;
}
