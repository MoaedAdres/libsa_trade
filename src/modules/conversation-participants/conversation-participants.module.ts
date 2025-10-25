import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationParticipantsService } from './conversation-participants.service';
import { ConversationParticipantsController } from './conversation-participants.controller';
import { ConversationParticipant } from './entities/conversation-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationParticipant])],
  controllers: [ConversationParticipantsController],
  providers: [ConversationParticipantsService],
  exports: [ConversationParticipantsService],
})
export class ConversationParticipantsModule {}
