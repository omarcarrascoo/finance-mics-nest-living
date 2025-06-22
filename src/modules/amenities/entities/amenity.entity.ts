// src/modules/amenities/entities/amenity.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('amenities')
export class Amenity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // — Datos básicos —
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  location?: string;

  @Column('int', { default: 1 })
  capacity: number;

  // — Tarifas de uso —
  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  price: number; // costo por unidad de tiempo o uso

  @Column({ length: 3, default: 'MXN' })
  currency: string; // moneda ISO

  @Column({ nullable: true })
  imageUrl?: string;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ default: true })
  isActive: boolean;

  // — Reservas vinculadas —
  @OneToMany(() => Reservation, (r) => r.amenity)
  reservations: Reservation[];
}
