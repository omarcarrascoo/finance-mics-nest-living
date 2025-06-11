import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  create(category: Category) {
    return this.categoriesRepo.save(category);
  }

  findAll() {
    return this.categoriesRepo.find();
  }

  findOne(id: string) {
    return this.categoriesRepo.findOne({ where: { id } });
  }

  update(id: string, category: Partial<Category>) {
    return this.categoriesRepo.update(id, category);
  }

  remove(id: string) {
    return this.categoriesRepo.delete(id);
  }
}
