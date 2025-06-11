import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { Resident } from './entities/resident.entity';

@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Post()
  create(@Body() resident: Resident) {
    return this.residentsService.create(resident);
  }

  @Get()
  findAll() {
    return this.residentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() resident: Resident) {
    return this.residentsService.update(id, resident);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residentsService.remove(id);
  }
}
