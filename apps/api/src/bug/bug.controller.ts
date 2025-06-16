import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { BugService } from './bug.service';

@Controller('bugs')
export class BugController {
  constructor(private bugService: BugService) {}

  @Get()
  async findAll() {
    return this.bugService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bugService.findOne(Number(id));
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.bugService.updateStatus(Number(id), status);
  }

  @Patch(':id/assign')
  async assignTo(
    @Param('id') id: string,
    @Body('userId') userId: number,
  ) {
    return this.bugService.assignTo(Number(id), userId);
  }
}
