import {
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';

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

  @IsNumber()
  estimatedRepairCost: number;

  @IsNumber()
  replacementCost: number;

  @IsOptional()
  @IsString()
  assessmentNotes?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  beforePhotoIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  afterPhotoIds?: number[];
}
