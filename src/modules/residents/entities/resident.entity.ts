// src/modules/residents/resident.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';
import { Maintenance } from '../../maintenance/entities/maintenance.entity';
import { Delinquency } from '../../delinquencies/entities/delinquency.entity';

@Entity()
export class Resident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  unitNumber: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Payment, (p) => p.resident)
  payments: Payment[];

  @OneToMany(() => Maintenance, (m) => m.resident)
  maintenance: Maintenance[];

  @OneToMany(() => Delinquency, (d) => d.resident)
  delinquencies: Delinquency[];
}
