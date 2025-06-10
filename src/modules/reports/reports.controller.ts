import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() data: any) {
    return this.reportsService.create(data);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.reportsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
