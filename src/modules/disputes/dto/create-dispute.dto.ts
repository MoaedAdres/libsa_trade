import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import {
  DisputeType,
  DamageCategory,
  DisputeStatus,
  DisputePriority,
} from '../../../common/enums';

export class CreateDisputeDto {
  @IsNumber()
  bookingId: number;

  @IsNumber()
  raisedBy: number;

  @IsEnum(DisputeType)
  disputeType: DisputeType;

  @IsOptional()
  @IsEnum(DamageCategory)
  damageCategory?: DamageCategory;

  @IsOptional()
  @IsEnum(DisputeStatus)
  status?: DisputeStatus;

  @IsOptional()
  @IsEnum(DisputePriority)
  priority?: DisputePriority;

  @IsOptional()
  @IsNumber()
  claimedAmount?: number;

  @IsString()
  description: string;

  @IsOptional()
  evidenceFileIds?: number[];

  @IsOptional()
  @IsNumber()
  assignedTo?: number;

  @IsOptional()
  @IsDateString()
  mustResolveBy?: string;
}
