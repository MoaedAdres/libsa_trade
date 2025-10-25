import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationParticipantDto } from './create-conversation-participant.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateConversationParticipantDto extends PartialType(
  CreateConversationParticipantDto,
) {
  @IsOptional()
  @IsBoolean()
  isMuted?: boolean;
}
