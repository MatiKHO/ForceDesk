import { 
  Controller, Get, Param, Patch, Body, Post, UseGuards, Query, Request 
} from '@nestjs/common';
import { BugService } from './bug.service';
import { CreateBugDto, UpdateBugDto, BugFilterDto, BugStatus } from './dto/bug.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bugs')
export class BugController {
  constructor(private bugService: BugService) {}

  @Get()
  async findAll(@Query() filterDto: BugFilterDto, @Request() req) {
    return this.bugService.findAll(filterDto, req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bugService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  async update(
    @Param('id') id: string, 
    @Body() updateBugDto: UpdateBugDto
  ) {
    return this.bugService.update(Number(id), updateBugDto);
  }

  @Post()
  @Roles('admin', 'manager')
  async create(@Body() createBugDto: CreateBugDto) {
    return this.bugService.create(createBugDto);
  }

  @Patch(':id/assign')
  async assignTo(
    @Param('id') id: string, 
    @Body('userId') userId: number | null
  ) {
    return this.bugService.assignTo(Number(id), userId);
  }

  @Patch(':id/status')
  @Roles('admin', 'manager', 'user') // todos pueden cambiar estado
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: BugStatus
  ) {
    return this.bugService.updateStatus(Number(id), status);
  }
}
