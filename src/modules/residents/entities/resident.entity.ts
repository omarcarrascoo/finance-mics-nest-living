// src/modules/residents/resident.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

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
}
