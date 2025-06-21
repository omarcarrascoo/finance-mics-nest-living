// src/modules/employees/entities/employee-work-schedule.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('employee_work_schedules')
export class EmployeeWorkSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  daysOfWeek: string[]; // ["MON","TUE",..."]

  @Column({ type: 'time' })
  shiftStart: string; // "08:00"

  @Column({ type: 'time' })
  shiftEnd: string; // "17:00"

  @Column('decimal', { precision: 4, scale: 2 })
  hoursPerDay: number; // e.g. 8.00

  @OneToOne(() => Employee, (e) => e.workSchedule)
  employee: Employee;
}
