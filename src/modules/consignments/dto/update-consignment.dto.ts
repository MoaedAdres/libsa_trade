import { PartialType } from '@nestjs/mapped-types';
import { CreateConsignmentDto } from './create-consignment.dto';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateConsignmentDto extends PartialType(CreateConsignmentDto) {
  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  commissionRate?: number;

  @IsOptional()
  @IsBoolean()
  intakePhotosComplete?: boolean;
}
