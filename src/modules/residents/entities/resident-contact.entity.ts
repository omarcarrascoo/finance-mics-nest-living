// src/modules/residents/entities/resident-contact.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resident } from './resident.entity';

export type ContactType = 'PRIMARY' | 'EMERGENCY';

@Entity('resident_contacts')
export class ResidentContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'simple-enum',
    enum: ['PRIMARY', 'EMERGENCY'],
    default: 'PRIMARY',
  })
  type: ContactType;

  @Column()
  name: string;

  @Column({ nullable: true })
  relationship?: string; // e.g. "Spouse", "Parent"

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @ManyToOne(() => Resident, (r) => r.emergencyContacts)
  resident: Resident;
}
