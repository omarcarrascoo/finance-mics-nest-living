// src/modules/residents/entities/resident-document.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resident } from './resident.entity';

export type ResidentDocType = 'LEASE' | 'ID' | 'OTHER';

@Entity('resident_documents')
export class ResidentDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['LEASE', 'ID', 'OTHER'] })
  type: ResidentDocType;

  @Column()
  url: string;

  @ManyToOne(() => Resident, (r) => r.documents, { onDelete: 'CASCADE' })
  resident: Resident;
}
