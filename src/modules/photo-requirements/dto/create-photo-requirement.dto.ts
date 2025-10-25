import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreatePhotoRequirementDto {
  @IsString()
  stage: string;

  @IsString()
  requiredFileTypes: string[];

  @IsNumber()
  minimumCount: number;

  @IsNumber()
  maximumCount: number;

  @IsBoolean()
  mandatory: boolean;

  @IsNumber()
  qualityThreshold: number;

  @IsOptional()
  @IsString()
  description?: string;
}
