import { 
  Controller, Get, Param, Patch, Body, Post, UseGuards, Query, Request, Delete, BadRequestException, NotFoundException
} from '@nestjs/common';
import { BugService } from './bug.service';
import { CreateBugDto, UpdateBugDto, BugFilterDto, BugStatus, AssignBugDto } from './dto/bug.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('bugs')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('MASTER', 'PADAWAN')
  async update(
    @Param('id') id: string, 
    @Body() updateBugDto: UpdateBugDto,
    @Request() req
  ) {
    return this.bugService.update(Number(id), updateBugDto, req.user.id);
  }

  @Post()
  @Roles('MASTER', 'PADAWAN')
  async create(@Body() createBugDto: CreateBugDto) {
    return this.bugService.create(createBugDto);
  }

  @Delete(':id')
  @Roles('MASTER', 'PADAWAN')
  async delete(@Param('id') id: string) {
    return this.bugService.delete(Number(id));
  }

  @Patch(':id/assign')
  @Roles('MASTER', 'PADAWAN')
  async assignTo(
    @Param('id') id: string,
    @Body() assignDto: AssignBugDto
  ) {
    try {
      return await this.bugService.assignBugToUser(
        Number(id),
        assignDto.userId ?? null
      );
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al asignar el bug');
    }
  }

  @Patch(':id/status')
  @Roles('MASTER', 'PADAWAN')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: BugStatus
  ) {
    return this.bugService.updateStatus(Number(id), status);
  }
}
