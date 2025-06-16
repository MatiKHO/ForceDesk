import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Bug } from '@prisma/client';

@Injectable()
export class BugService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Bug[]> {
    return this.prisma.bug.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number): Promise<Bug | null> {
    return this.prisma.bug.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async create(data: { title: string; priority?: string; assignedTo?: number }): Promise<Bug> {
    return this.prisma.bug.create({ data });
  }

  async updateStatus(id: number, status: string): Promise<Bug> {
    return this.prisma.bug.update({
      where: { id },
      data: { status },
    });
  }

  async assignTo(id: number, userId: number): Promise<Bug> {
    return this.prisma.bug.update({
      where: { id },
      data: { assignedTo: userId },
    });
  }
}
