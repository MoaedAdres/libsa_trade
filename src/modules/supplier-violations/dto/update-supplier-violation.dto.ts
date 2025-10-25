import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierViolationDto } from './create-supplier-violation.dto';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateSupplierViolationDto extends PartialType(
  CreateSupplierViolationDto,
) {
  @IsOptional()
  @IsBoolean()
  resolved?: boolean;

  @IsOptional()
  @IsString()
  resolutionNotes?: string;
}
