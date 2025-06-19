import { Type } from 'class-transformer';
import { IsString, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';

export enum BugStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export enum BugPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export class CreateBugDto {
  @IsString()
  title: string;

  @IsEnum(BugPriority)
  @IsOptional()
  priority?: BugPriority;
}

export class UpdateBugDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(BugStatus)
  @IsOptional()
  status?: BugStatus;

  @IsEnum(BugPriority)
  @IsOptional()
  priority?: BugPriority;
}

export class BugFilterDto {
  @IsEnum(BugStatus)
  @IsOptional()
  status?: BugStatus;

  @IsString()
  @IsOptional()
  assignment?: 'UNASSIGNED' | 'ASSIGNED_TO_ME' | 'ASSIGNED_TO_OTHERS';


  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}