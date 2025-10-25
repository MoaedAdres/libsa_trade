import { IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ParticipantRole } from '../../../common/enums';

export class AddParticipantDto {
  @IsNumber()
  userId: number;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;

  @IsOptional()
  @IsBoolean()
  isMuted?: boolean;
}
