import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';
import { Condo } from '../../condos/entities/condo.entity';

@Entity()
export class Delinquency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Condo)
  condo: Condo;

  @ManyToOne(() => Resident, (r) => r.delinquencies)
  resident: Resident;

  @Column()
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;
}
