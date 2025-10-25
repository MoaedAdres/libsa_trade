import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { OwnerType } from '../../../common/enums';

export class CreateAddressDto {
  @IsEnum(OwnerType)
  ownerType: OwnerType;

  @IsNumber()
  ownerId: number;

  @IsOptional()
  @IsString()
  label?: string;

  @IsString()
  line1: string;

  @IsOptional()
  @IsString()
  line2?: string;

  @IsString()
  city: string;

  @IsString()
  region: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;
}
