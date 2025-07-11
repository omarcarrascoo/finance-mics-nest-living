// src/modules/employees/entities/employee-absence.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

export enum AbsenceType {
  VACATION = 'VACATION',
  SICK = 'SICK',
  PERSONAL = 'PERSONAL',
  UNPAID = 'UNPAID',
  OTHER = 'OTHER',
}

@Entity('employee_absences')
export class EmployeeAbsence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (e) => e.absences, { onDelete: 'CASCADE' })
  employee: Employee;

  @Column({ type: 'simple-enum', enum: AbsenceType })
  type: AbsenceType;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column('int')
  days: number;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @CreateDateColumn()
  recordedAt: Date;
}
