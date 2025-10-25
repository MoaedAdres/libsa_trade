import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import {
  ListingType,
  PricingUnit,
  AvailabilityStatus,
} from '../../../common/enums';

export class CreateListingDto {
  @IsNumber()
  itemId: number;

  @IsEnum(ListingType)
  type: ListingType;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @IsEnum(PricingUnit)
  pricingUnit: PricingUnit;

  @IsOptional()
  @IsEnum(AvailabilityStatus)
  availabilityStatus?: AvailabilityStatus;

  @IsOptional()
  @IsDateString()
  availableFrom?: string;

  @IsOptional()
  @IsDateString()
  availableTo?: string;

  @IsOptional()
  @IsString()
  cancellationPolicy?: string;

  @IsOptional()
  @IsNumber()
  minRentalDays?: number;

  @IsOptional()
  @IsNumber()
  maxRentalDays?: number;

  @IsOptional()
  @IsBoolean()
  listingPhotosComplete?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
