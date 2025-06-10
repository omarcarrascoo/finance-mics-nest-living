import { Injectable } from '@nestjs/common';
import { Delinquency } from './entities/delinquency.entity';

@Injectable()
export class DelinquenciesService {
  create(delinquency: Delinquency) {
    return `This action adds a new delinquency`;
  }

  findAll() {
    return `This action returns all delinquencies`;
  }

  findOne(id: string) {
    return `This action returns a #${id} delinquency`;
  }

  update(id: string, delinquency: Delinquency) {
    return `This action updates a #${id} delinquency`;
  }

  remove(id: string) {
    return `This action removes a #${id} delinquency`;
  }
}
