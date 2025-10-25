import { PartialType } from '@nestjs/mapped-types';
import { CreateDisputeDto } from './create-dispute.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateDisputeDto extends PartialType(CreateDisputeDto) {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  claimedAmount?: number;

  @IsOptional()
  @IsNumber()
  approvedAmount?: number;

  @IsOptional()
  @IsString()
  resolutionSummary?: string;
}
