import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ViolationType, Severity } from '../../../common/enums';

export class CreateSupplierViolationDto {
  @IsNumber()
  supplierId: number;

  @IsEnum(ViolationType)
  violationType: ViolationType;

  @IsEnum(Severity)
  severity: Severity;

  @IsOptional()
  @IsNumber()
  penaltyAmount?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  bookingId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  evidenceFileIds?: number[];

  @IsNumber()
  createdBy: number;
}
