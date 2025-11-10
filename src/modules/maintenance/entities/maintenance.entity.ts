import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Resident, (r) => r.maintenance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resident_id' })
  resident: Resident;

  @Column({ name: 'resident_id', type: 'text' })
  residentId: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  paid: boolean;
}
