// src/modules/providers/providers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly repo: Repository<Provider>,
  ) {}

  create(provider: Provider) {
    return this.repo.save(provider);
  }

  findAll() {
    return this.repo.find({
      relations: [
        'serviceType',
        'contact',
        'contract',
        'documents',
        'statistics',
        'expenses',
      ],
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: [
        'serviceType',
        'contact',
        'contract',
        'documents',
        'statistics',
        'expenses',
      ],
    });
  }

  update(id: string, provider: Partial<Provider>) {
    return this.repo.update(id, provider);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
