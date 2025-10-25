import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDamageAssessmentDto {
  @IsNumber()
  disputeId: number;

  @IsNumber()
  assessedBy: number;

  @IsString()
  damageLocation: string;

  @IsString()
  damageType: string;

  @IsNumber()
  severityScore: number;

  @IsBoolean()
  repairFeasible: boolean;

  @IsOptional()
  @IsNumber()
  estimatedRepairCost?: number;

  @IsOptional()
  @IsNumber()
  replacementCost?: number;

  @IsOptional()
  @IsString()
  assessmentNotes?: string;

  @IsOptional()
  beforePhotoIds?: number[];

  @IsOptional()
  afterPhotoIds?: number[];
}
