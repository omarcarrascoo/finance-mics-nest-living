import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DelinquenciesService } from './delinquencies.service';
import { Delinquency } from './entities/delinquency.entity';

@Controller('delinquencies')
export class DelinquenciesController {
  constructor(private readonly delinquenciesService: DelinquenciesService) {}

  @Post()
  create(@Body() delinquency: Delinquency) {
    return this.delinquenciesService.create(delinquency);
  }

  @Get()
  findAll() {
    return this.delinquenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.delinquenciesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() delinquency: Delinquency) {
    return this.delinquenciesService.update(id, delinquency);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.delinquenciesService.remove(id);
  }
}
