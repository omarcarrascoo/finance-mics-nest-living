import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_leave_balances')
export class EmployeeLeaveBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  vacationDaysAccrued: number;

  @Column('int', { default: 0 })
  vacationDaysTaken: number;

  @Column('int', { default: 0 })
  sickDaysAccrued: number;

  @Column('int', { default: 0 })
  sickDaysTaken: number;

  // total days taken across all absence types (for quick reference)
  @Column('int', { default: 0 })
  totalAbsenceDays: number;

  @OneToOne(() => Employee, (e) => e.leaveBalance)
  @JoinColumn()
  employee: Employee;
}
