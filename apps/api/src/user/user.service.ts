import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<{ id: number; username: string }[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true, 
      }
    });
  }

  async findOne(id: number): Promise<User | null> {
    const userId = Number(id);
    if (!userId || isNaN(userId)) {
      console.warn('findOne: id is invalid, returning null');
      return null;
    }
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(data: { username: string; password: string; role?: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateProfile(id: number, data: { username?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
