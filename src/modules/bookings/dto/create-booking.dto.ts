import {
  IsNumber,
  IsDateString,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { PaymentMethod } from '../../../common/enums';

export class CreateBookingDto {
  @IsNumber()
  listingId: number;

  @IsNumber()
  renterId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @IsOptional()
  @IsBoolean()
  depositPaid?: boolean;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsNumber()
  pickupLocationAddressId?: number;

  @IsOptional()
  @IsNumber()
  dropoffLocationAddressId?: number;

  @IsOptional()
  @IsDateString()
  pickupScheduledAt?: string;

  @IsOptional()
  @IsDateString()
  returnScheduledAt?: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
