import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delinquency } from './entities/delinquency.entity';

@Injectable()
export class DelinquenciesService {
  constructor(
    @InjectRepository(Delinquency)
    private readonly delinquencyRepo: Repository<Delinquency>,
  ) {}

  create(delinquency: Delinquency) {
    return this.delinquencyRepo.save(delinquency);
  }

  findAll() {
    return this.delinquencyRepo.find({ relations: ['resident'] });
  }

  findOne(id: string) {
    return this.delinquencyRepo.findOne({ where: { id }, relations: ['resident'] });
  }

  update(id: string, delinquency: Partial<Delinquency>) {
    return this.delinquencyRepo.update(id, delinquency);
  }

  remove(id: string) {
    return this.delinquencyRepo.delete(id);
  }
}
