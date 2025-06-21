// src/modules/employees/employees.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
  ) {}

  create(employee: Employee) {
    return this.repo.save(employee);
  }

  findAll() {
    return this.repo.find({
      relations: [
        'fiscal',
        'socialSecurity',
        'contract',
        'salary',
        'workSchedule',
        'payrollRecords',
        'leaveBalance',
        'absences',
      ],
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: [
        'fiscal',
        'socialSecurity',
        'contract',
        'salary',
        'workSchedule',
        'payrollRecords',
        'leaveBalance',
        'absences',
      ],
    });
  }

  update(id: string, employee: Partial<Employee>) {
    return this.repo.update(id, employee);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
