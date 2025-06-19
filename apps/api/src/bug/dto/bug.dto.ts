import { Type } from 'class-transformer';
import { IsString, IsEnum, IsOptional, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

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

  @IsOptional()
  @IsNumber()
  assignedTo?: number | null;

  @IsEnum(BugPriority)
  @IsOptional()
  priority?: BugPriority;
}

export class AssignBugDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  userId?: number | null;
}

export class BugFilterDto {
  @IsEnum(BugStatus)
  @IsOptional()
  status?: BugStatus;

  @IsString()
  @IsOptional()
  assignment?: 'UNASSIGNED' | 'ASSIGNED_TO_ME' | 'ASSIGNED_TO_OTHERS';

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit?: number;
}