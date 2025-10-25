import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { PaymentType, PaymentStatus, RelatedType } from '../../../common/enums';

export class CreatePaymentDto {
  @IsNumber()
  bookingId: number;

  @IsOptional()
  @IsEnum(RelatedType)
  relatedType?: RelatedType;

  @IsOptional()
  @IsNumber()
  relatedId?: number;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsString()
  method: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  gatewayReference?: string;

  @IsOptional()
  @IsNumber()
  processedBy?: number;

  @IsOptional()
  @IsNumber()
  processingFee?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
