import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resident } from './entities/resident.entity';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident)
    private readonly residentsRepo: Repository<Resident>,
  ) {}

  create(resident: Resident) {
    return this.residentsRepo.save(resident);
  }

  findAll() {
    return this.residentsRepo.find({ relations: ['payments', 'reservations'] });
  }

  findOne(id: string) {
    return this.residentsRepo.findOne({
      where: { id },
      relations: ['payments', 'reservations'],
    });
  }

  update(id: string, resident: Partial<Resident>) {
    return this.residentsRepo.update(id, resident);
  }

  remove(id: string) {
    return this.residentsRepo.delete(id);
  }
}
