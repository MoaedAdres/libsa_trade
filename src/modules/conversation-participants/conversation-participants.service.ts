import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';

@Injectable()
export class ConversationParticipantsService {
  constructor(
    @InjectRepository(ConversationParticipant)
    private conversationParticipantRepository: Repository<ConversationParticipant>,
  ) {}

  async create(createConversationParticipantDto: CreateConversationParticipantDto): Promise<ConversationParticipant> {
    const conversationParticipant = this.conversationParticipantRepository.create(createConversationParticipantDto);
    return this.conversationParticipantRepository.save(conversationParticipant);
  }

  async findAll(): Promise<ConversationParticipant[]> {
    return this.conversationParticipantRepository.find();
  }

  async findOne(id: number): Promise<ConversationParticipant> {
    const conversationParticipant = await this.conversationParticipantRepository.findOne({
      where: { id },
    });

    if (!conversationParticipant) {
      throw new NotFoundException(`Conversation participant with ID ${id} not found`);
    }

    return conversationParticipant;
  }

  async findByConversation(conversationId: number): Promise<ConversationParticipant[]> {
    return this.conversationParticipantRepository.find({
      where: { conversationId },
    });
  }

  async findByUser(userId: number): Promise<ConversationParticipant[]> {
    return this.conversationParticipantRepository.find({
      where: { userId },
    });
  }

  async update(id: number, updateConversationParticipantDto: UpdateConversationParticipantDto): Promise<ConversationParticipant> {
    const conversationParticipant = await this.findOne(id);
    Object.assign(conversationParticipant, updateConversationParticipantDto);
    return this.conversationParticipantRepository.save(conversationParticipant);
  }

  async remove(id: number): Promise<void> {
    const conversationParticipant = await this.findOne(id);
    await this.conversationParticipantRepository.remove(conversationParticipant);
  }

  async markAsRead(conversationId: number, userId: number): Promise<ConversationParticipant> {
    const participant = await this.conversationParticipantRepository.findOne({
      where: { conversationId, userId },
    });

    if (!participant) {
      throw new NotFoundException(`Participant not found for conversation ${conversationId} and user ${userId}`);
    }

    participant.lastReadAt = new Date();
    return this.conversationParticipantRepository.save(participant);
  }

  async toggleMute(id: number): Promise<ConversationParticipant> {
    const participant = await this.findOne(id);
    participant.isMuted = !participant.isMuted;
    return this.conversationParticipantRepository.save(participant);
  }
}
