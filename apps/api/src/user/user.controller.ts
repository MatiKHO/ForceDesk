import { Controller, Get, Param, UseGuards, Request, Patch, Body, Delete, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

interface UserPayload {
  id: number;
  username: string;
  role: string;
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  async getMe(@AuthUser() user: any) {
    const userId = Number(user.id);
    const dbUser = await this.userService.findOne(userId);
    if (!dbUser) {
      return { message: 'User not found' };
    }
    const { password, ...rest } = dbUser;
    return rest;
  }

  @Patch('profile')
  async updateProfile(
    @Request() req: Request,
    @Body() body: { username?: string }
  ) {
    return this.userService.updateProfile((req as any).user.id, { username: body.username });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  @Roles('MASTER')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }

  @Patch(':id')
  @Roles('MASTER')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(Number(id), updateUserDto);
  }
}
