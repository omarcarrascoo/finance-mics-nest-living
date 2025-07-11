import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';
import { Condo } from '../../condos/entities/condo.entity';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @ManyToOne(() => Resident, (r) => r.id)
  resident: Resident;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  paid: boolean;
}
