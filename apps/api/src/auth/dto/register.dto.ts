import { IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/common/types';



export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}