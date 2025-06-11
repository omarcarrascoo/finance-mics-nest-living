import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepo: Repository<Maintenance>,
  ) {}

  create(maintenance: Maintenance) {
    return this.maintenanceRepo.save(maintenance);
  }

  findAll() {
    return this.maintenanceRepo.find({ relations: ['resident'] });
  }

  findOne(id: string) {
    return this.maintenanceRepo.findOne({ where: { id }, relations: ['resident'] });
  }

  update(id: string, maintenance: Partial<Maintenance>) {
    return this.maintenanceRepo.update(id, maintenance);
  }

  remove(id: string) {
    return this.maintenanceRepo.delete(id);
  }

  overdue() {
    return this.maintenanceRepo.find({
      where: { paid: false, dueDate: LessThan(new Date()) },
      relations: ['resident'],
    });
  }
}
