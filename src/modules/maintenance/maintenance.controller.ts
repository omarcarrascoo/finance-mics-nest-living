import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from './entities/maintenance.entity';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  create(@Body() maintenance: Maintenance) {
    return this.maintenanceService.create(maintenance);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get('overdue')
  overdue() {
    return this.maintenanceService.overdue();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() maintenance: Maintenance) {
    return this.maintenanceService.update(id, maintenance);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(id);
  }
}
