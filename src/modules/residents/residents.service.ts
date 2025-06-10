import { Injectable } from '@nestjs/common';
import { Resident } from './entities/resident.entity';

@Injectable()
export class ResidentsService {
  create(resident: Resident) {
    return `This action adds a new resident`;
  }

  findAll() {
    return `This action returns all residents`;
  }

  findOne(id: string) {
    return `This action returns a #${id} resident`;
  }

  update(id: string, resident: Resident) {
    return `This action updates a #${id} resident`;
  }

  remove(id: string) {
    return `This action removes a #${id} resident`;
  }
}
