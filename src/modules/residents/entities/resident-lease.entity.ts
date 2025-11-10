// src/modules/residents/entities/resident-lease.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Resident } from './resident.entity';

@Entity('resident_leases')
export class ResidentLease {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate?: string;

  @Column('decimal', { precision: 12, scale: 2 })
  rentAmount: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  securityDeposit: number;

  @Column({ nullable: true })
  leaseDocumentUrl?: string;

  @Column({ type: 'text', nullable: true })
  terms?: string;

  @OneToOne(() => Resident, (r) => r.lease, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resident_id' })
  resident: Resident;

  @Column({ name: 'resident_id', type: 'text', unique: true })
  residentId: string;
}
