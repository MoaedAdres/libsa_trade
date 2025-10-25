import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ConsignmentStatus } from '../../../common/enums';

export class CreateConsignmentDto {
  @IsNumber()
  ownerUserId: number;

  @IsNumber()
  supplierId: number;

  @IsOptional()
  @IsEnum(ConsignmentStatus)
  status?: ConsignmentStatus;

  @IsOptional()
  @IsNumber()
  commissionRate?: number;

  @IsOptional()
  @IsNumber()
  signedAgreementFileId?: number;

  @IsOptional()
  @IsNumber()
  ownerIdScanFileId?: number;

  @IsOptional()
  @IsBoolean()
  intakePhotosComplete?: boolean;

  @IsOptional()
  @IsDateString()
  intakeAt?: string;

  @IsOptional()
  @IsNumber()
  intakeBy?: number;

  @IsOptional()
  @IsDateString()
  returnAt?: string;

  @IsOptional()
  @IsNumber()
  returnBy?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
