import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBugDto, UpdateBugDto, BugFilterDto, BugStatus } from './dto/bug.dto';

@Injectable()
export class BugService {
  constructor(private prisma: PrismaService) {}

  async findAll(filterDto: BugFilterDto, userId: number) {
    const where: any = {};
  
    if (filterDto.status) {
      where.status = filterDto.status;
    }
  
    if (filterDto.assignment) {
      switch (filterDto.assignment) {
        case 'UNASSIGNED':
          where.assignedTo = null;
          break;
        case 'ASSIGNED_TO_ME':
          where.assignedTo = userId;
          break;
        case 'ASSIGNED_TO_OTHERS':
          where.assignedTo = { not: userId };
          break;
      }
    }
  
    const page = filterDto.page ?? 1;
    const limit = filterDto.limit ?? 10;
    const skip = (page - 1) * limit;
  
    const [bugs, total] = await this.prisma.$transaction([
      this.prisma.bug.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.bug.count({ where }),
    ]);
  
    const totalPages = Math.ceil(total / limit);
  
    return {
      bugs,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const bug = await this.prisma.bug.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!bug) {
      throw new NotFoundException(`Bug with ID ${id} not found`);
    }

    return bug;
  }

  async create(createBugDto: CreateBugDto) {
    return this.prisma.bug.create({
      data: {
        title: createBugDto.title,
        priority: createBugDto.priority,
        status: BugStatus.OPEN,
      },
    });
  }

  async update(id: number, updateBugDto: UpdateBugDto) {
    return this.prisma.bug.update({
      where: { id },
      data: updateBugDto,
    });
  }

  async assignTo(id: number, userId: number | null) {
    return this.prisma.bug.update({
      where: { id },
      data: {
        assignedTo: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number, status: BugStatus) {
    return this.prisma.bug.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
