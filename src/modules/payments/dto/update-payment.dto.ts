import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  @IsString()
  gatewayReference?: string;

  @IsOptional()
  @IsNumber()
  processingFee?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
