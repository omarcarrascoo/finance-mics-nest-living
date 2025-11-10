// src/modules/residents/entities/resident-statistic.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Resident } from './resident.entity';

@Entity('resident_statistics')
export class ResidentStatistic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  totalPayments: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  totalPaid: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  avgPaymentDelayDays: number;

  @Column({ type: 'date', nullable: true })
  lastPaymentDate?: string;

  @Column('int', { default: 0 })
  maintenanceRequests: number;

  @Column('int', { default: 0 })
  delinquenciesCount: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balanceOwed: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  delinquencyRate: number; // % of months with overdue payments

  @OneToOne(() => Resident, (r) => r.statistics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resident_id' })
  resident: Resident;

  @Column({ name: 'resident_id', type: 'text', unique: true })
  residentId: string;
}
