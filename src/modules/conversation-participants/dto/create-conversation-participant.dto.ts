import { IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ParticipantRole } from '../../../common/enums';

export class CreateConversationParticipantDto {
  @IsNumber()
  conversationId: number;

  @IsNumber()
  userId: number;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;

  @IsOptional()
  @IsBoolean()
  isMuted?: boolean;
}
