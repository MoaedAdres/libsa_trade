import { PartialType } from '@nestjs/mapped-types';
import { CreateDamageAssessmentDto } from './create-damage-assessment.dto';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateDamageAssessmentDto extends PartialType(
  CreateDamageAssessmentDto,
) {
  @IsOptional()
  @IsString()
  damageLocation?: string;

  @IsOptional()
  @IsString()
  damageType?: string;

  @IsOptional()
  @IsNumber()
  severityScore?: number;

  @IsOptional()
  @IsBoolean()
  repairFeasible?: boolean;

  @IsOptional()
  @IsNumber()
  estimatedRepairCost?: number;

  @IsOptional()
  @IsNumber()
  replacementCost?: number;

  @IsOptional()
  @IsString()
  assessmentNotes?: string;
}
