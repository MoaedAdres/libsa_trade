import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ItemCategory, ConditionRating } from '../../../common/enums';

export class CreateItemDto {
  @IsNumber()
  supplierId: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsEnum(ItemCategory)
  category: ItemCategory;

  @IsEnum(ConditionRating)
  conditionRating: ConditionRating;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  estimatedValue?: number;

  @IsOptional()
  @IsBoolean()
  isConsignment?: boolean;

  @IsOptional()
  @IsNumber()
  consignmentId?: number;
}
