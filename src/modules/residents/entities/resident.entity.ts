// src/modules/residents/entities/resident.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ResidentContact } from './resident-contact.entity';
import { ResidentLease } from './resident-lease.entity';
import { ResidentDocument } from './resident-document.entity';
import { ResidentStatistic } from './resident-statistic.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
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
  @OneToOne(() => ResidentContact, (c) => c.primaryOf, {
    eager: true,
  })
  primaryContact?: ResidentContact;

  @OneToMany(() => ResidentContact, (c) => c.resident, {
    eager: true,
    cascade: ['insert', 'update'],
    orphanedRowAction: 'delete',
  })
  emergencyContacts?: ResidentContact[];

  @OneToOne(() => ResidentLease, (l) => l.resident, {
    eager: true,
  })
  lease?: ResidentLease;

  @OneToMany(() => ResidentDocument, (d) => d.resident, {
    eager: true,
    cascade: ['insert', 'update'],
    orphanedRowAction: 'delete',
  })
  documents?: ResidentDocument[];

  @OneToOne(() => ResidentStatistic, (s) => s.resident, {
    eager: true,
  })
  statistics?: ResidentStatistic;

  // — Relaciones de negocio existentes —
  @OneToMany(() => Payment, (p) => p.resident)
  payments: Payment[];

  @OneToMany(() => Maintenance, (m) => m.resident)
  maintenance: Maintenance[];

  @OneToMany(() => Delinquency, (d) => d.resident)
  delinquencies: Delinquency[];

  // — Nuevas reservas de amenidades —
  @OneToMany(() => Reservation, (r) => r.resident)
  reservations: Reservation[];

  // — Metadatos y etiquetas —
  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ type: 'text', nullable: true })
  internalNotes?: string;
}
