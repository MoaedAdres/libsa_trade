import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsArray,
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
  @IsArray()
  @IsNumber({}, { each: true })
  attachmentFileIds?: number[];

  @IsOptional()
  @IsNumber()
  replyToMessageId?: number;
}
