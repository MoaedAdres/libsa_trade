import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoRequirementDto } from './create-photo-requirement.dto';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdatePhotoRequirementDto extends PartialType(
  CreatePhotoRequirementDto,
) {
  @IsOptional()
  @IsNumber()
  minimumCount?: number;

  @IsOptional()
  @IsNumber()
  maximumCount?: number;

  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;

  @IsOptional()
  @IsNumber()
  qualityThreshold?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
