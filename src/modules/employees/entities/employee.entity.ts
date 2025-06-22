// src/modules/employees/entities/employee.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { EmployeeFiscal } from './employee-fiscal.entity';
import { EmployeeSocialSecurity } from './employee-ssn.entity';
import { EmployeeContract } from './employee-contract.entity';
import { EmployeeSalary } from './employee-salary.entity';
import { EmployeeWorkSchedule } from './employee-work-schedule.entity';
import { EmployeePayrollRecord } from './employee-payroll.entity';
import { EmployeeLeaveBalance } from './employee-leave.entity';
import { EmployeeAbsence } from './employee-absence.entity';
import { Payment } from '../../payments/entities/payment.entity';

export enum EmployeeType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACTOR = 'CONTRACTOR',
  INTERN = 'INTERN',
  TEMPORARY = 'TEMPORARY',
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // — Datos personales básicos —
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'simple-enum', enum: EmployeeType })
  type: EmployeeType;

  @Column({ type: 'date' })
  hireDate: string;

  @Column({ type: 'date', nullable: true })
  terminationDate?: string;

  @Column({ default: true })
  isActive: boolean;

  // — Relaciones uno a uno —
  @OneToOne(() => EmployeeFiscal, (f) => f.employee, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  fiscal: EmployeeFiscal;

  @OneToOne(() => EmployeeSocialSecurity, (s) => s.employee, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  socialSecurity: EmployeeSocialSecurity;

  @OneToOne(() => EmployeeContract, (c) => c.employee, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  contract: EmployeeContract;

  @OneToOne(() => EmployeeSalary, (sal) => sal.employee, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  salary: EmployeeSalary;

  @OneToOne(() => EmployeeWorkSchedule, (ws) => ws.employee, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  workSchedule: EmployeeWorkSchedule;

  // — Históricos y balances —
  @OneToMany(() => EmployeePayrollRecord, (pr) => pr.employee, {
    cascade: true,
    eager: false,
  })
  payrollRecords: EmployeePayrollRecord[];

  @OneToMany(() => EmployeeAbsence, (a) => a.employee, {
    cascade: true,
    eager: true,
  })
  absences: EmployeeAbsence[];

  @OneToOne(() => EmployeeLeaveBalance, (lb) => lb.employee, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  leaveBalance: EmployeeLeaveBalance;

  @OneToMany(() => Payment, (p) => p.employee)
  payments: Payment[];

  // — Anotaciones internas —
  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
