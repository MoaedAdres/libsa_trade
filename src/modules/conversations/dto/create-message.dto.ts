import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { MessageType } from '../../../common/enums';

export class CreateMessageDto {
  @IsNumber()
  conversationId: number;

  @IsNumber()
  senderId: number;

  @IsOptional()
  @IsEnum(MessageType)
  messageType?: MessageType;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsBoolean()
  isRedacted?: boolean;

  @IsOptional()
  @IsString()
  redactedReason?: string;

  @IsOptional()
  @IsBoolean()
  hasContactFlag?: boolean;

  @IsOptional()
  attachmentFileIds?: number[];

  @IsOptional()
  @IsNumber()
  replyToMessageId?: number;
}
