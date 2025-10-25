import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ConversationStatus } from '../../../common/enums';

export class CreateConversationDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsNumber()
  bookingId?: number;

  @IsNumber()
  createdBy: number;

  @IsOptional()
  @IsEnum(ConversationStatus)
  status?: ConversationStatus;
}
