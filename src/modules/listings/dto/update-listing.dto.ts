import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';
import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @IsOptional()
  @IsBoolean()
  listingPhotosComplete?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
