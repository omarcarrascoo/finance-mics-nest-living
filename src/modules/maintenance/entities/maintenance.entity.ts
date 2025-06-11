import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Resident, (r) => r.id)
  resident: Resident;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  paid: boolean;
}
