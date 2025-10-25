import {
  IsNumber,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PayoutStatus, PayoutPaymentMethod } from '../../../common/enums';

export class CreatePayoutDto {
  @IsNumber()
  supplierId: number;

  @IsDateString()
  payoutPeriodStart: string;

  @IsDateString()
  payoutPeriodEnd: string;

  @IsNumber()
  grossAmount: number;

  @IsNumber()
  platformFee: number;

  @IsOptional()
  @IsNumber()
  penalties?: number;

  @IsNumber()
  netAmount: number;

  @IsOptional()
  @IsEnum(PayoutStatus)
  status?: PayoutStatus;

  @IsOptional()
  @IsDateString()
  holdUntil?: string;

  @IsEnum(PayoutPaymentMethod)
  paymentMethod: PayoutPaymentMethod;

  @IsOptional()
  bankDetails?: Record<string, any>;

  @IsOptional()
  includedBookingIds?: number[];

  @IsOptional()
  @IsNumber()
  processedBy?: number;
}
