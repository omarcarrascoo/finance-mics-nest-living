// src/modules/residents/entities/resident.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ResidentContact } from './resident-contact.entity';
import { ResidentLease } from './resident-lease.entity';
import { ResidentDocument } from './resident-document.entity';
import { ResidentStatistic } from './resident-statistic.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Maintenance } from '../../maintenance/entities/maintenance.entity';
import { Delinquency } from '../../delinquencies/entities/delinquency.entity';

@Entity('residents')
export class Resident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // — Datos básicos —
  @Column()
  fullName: string;

  @Column({ unique: true })
  unitNumber: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  alternatePhone?: string;

  @Column({ type: 'date', nullable: true })
  moveInDate?: string;

  @Column({ type: 'date', nullable: true })
  moveOutDate?: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';

  // — Relaciones auxiliares —
  @OneToOne(() => ResidentContact, (c) => c.resident, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  primaryContact?: ResidentContact;

  @OneToMany(() => ResidentContact, (c) => c.resident, {
    cascade: true,
    eager: true,
  })
  emergencyContacts?: ResidentContact[];

  @OneToOne(() => ResidentLease, (l) => l.resident, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  lease?: ResidentLease;

  @OneToMany(() => ResidentDocument, (d) => d.resident, {
    cascade: true,
    eager: true,
  })
  documents?: ResidentDocument[];

  @OneToOne(() => ResidentStatistic, (s) => s.resident, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn()
  statistics?: ResidentStatistic;

  // — Relaciones de negocio existentes —
  @OneToMany(() => Payment, (p) => p.resident)
  payments: Payment[];

  @OneToMany(() => Maintenance, (m) => m.resident)
  maintenance: Maintenance[];

  @OneToMany(() => Delinquency, (d) => d.resident)
  delinquencies: Delinquency[];

  // — Metadatos y etiquetas —
  @Column('simple-array', { nullable: true })
  tags?: string[]; // e.g. ["VIP","PetFriendly"]

  @Column({ type: 'text', nullable: true })
  internalNotes?: string;
}
