// src/modules/employees/entities/employee-payroll.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_payroll_records')
export class EmployeePayrollRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (e) => e.payrollRecords)
  employee: Employee;

  @Column({ type: 'date' })
  periodStart: string;

  @Column({ type: 'date' })
  periodEnd: string;

  @Column('decimal', { precision: 12, scale: 2 })
  grossPay: number;

  @Column('decimal', { precision: 12, scale: 2 })
  totalDeductions: number;

  @Column('decimal', { precision: 12, scale: 2 })
  netPay: number;

  @Column({ nullable: true })
  payDate?: string;

  @Column({ nullable: true })
  reference?: string; // número de nómina o folio
}
