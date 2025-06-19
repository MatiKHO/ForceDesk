import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userService.create({
      username: registerDto.username,
      password: hashedPassword,
      role: registerDto.role || 'PADAWAN',
    });
  
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user.id,
      role: user.role 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}
