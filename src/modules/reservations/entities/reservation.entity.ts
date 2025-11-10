// src/modules/reservations/entities/reservation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Resident } from '../../residents/entities/resident.entity';
import { Amenity } from '../../amenities/entities/amenity.entity';
import { Payment } from '../../payments/entities/payment.entity';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Resident, (r) => r.reservations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resident_id' })
  resident: Resident;

  @Column({ name: 'resident_id', type: 'text' })
  residentId: string;

  @ManyToOne(() => Amenity, (a) => a.reservations, { nullable: false })
  amenity: Amenity;

  @Column({ type: 'date' })
  startTime: Date;

  @Column({ type: 'date' })
  endTime: Date;

  @Column({
    type: 'simple-enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // — Pagos asociados a esta reserva —
  @OneToMany(() => Payment, (p) => p.reservation)
  payments: Payment[];
}
