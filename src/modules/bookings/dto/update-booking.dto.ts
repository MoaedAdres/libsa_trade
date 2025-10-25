import { CreateBookingDto } from './create-booking.dto';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { BookingStatus } from '../../../common/enums';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus?: BookingStatus;

  @IsOptional()
  @IsString()
  cancellationReason?: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
