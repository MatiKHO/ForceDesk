import { IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from 'src/common/types';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}