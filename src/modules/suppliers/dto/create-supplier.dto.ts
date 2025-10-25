import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { SupplierStatus, VerificationLevel } from '../../../common/enums';

export class CreateSupplierDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  visibleContact?: string;

  @IsOptional()
  @IsString()
  realContact?: string;

  @IsOptional()
  @IsBoolean()
  contactRevealed?: boolean;

  @IsOptional()
  @IsEnum(SupplierStatus)
  status?: SupplierStatus;

  @IsOptional()
  @IsEnum(VerificationLevel)
  verificationLevel?: VerificationLevel;
}
