import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from '../conversation-participants/entities/conversation-participant.entity';
import { Message } from '../messages/entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { AddParticipantDto } from './dto/add-participant.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(ConversationParticipant)
    private participantRepository: Repository<ConversationParticipant>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  // Conversation methods
  async create(createConversationDto: CreateConversationDto): Promise<Conversation> {
    const conversation = this.conversationRepository.create(createConversationDto);
    return this.conversationRepository.save(conversation);
  }

  async findAll(): Promise<Conversation[]> {
    return this.conversationRepository.find({
      relations: ['booking', 'createdByUser', 'participants', 'messages'],
    });
  }

  async findOne(id: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['booking', 'createdByUser', 'participants', 'messages'],
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }

    return conversation;
  }

  async findByBooking(bookingId: number): Promise<Conversation[]> {
    return this.conversationRepository.find({
      where: { bookingId },
      relations: ['booking', 'createdByUser', 'participants', 'messages'],
    });
  }

  async findByUser(userId: number): Promise<Conversation[]> {
    const participants = await this.participantRepository.find({
      where: { userId },
      relations: ['conversation', 'conversation.booking', 'conversation.createdByUser'],
    });

    return participants.map(p => p.conversation);
  }

  async update(id: number, updateConversationDto: UpdateConversationDto): Promise<Conversation> {
    const conversation = await this.findOne(id);
    Object.assign(conversation, updateConversationDto);
    return this.conversationRepository.save(conversation);
  }

  async remove(id: number): Promise<void> {
    const conversation = await this.findOne(id);
    await this.conversationRepository.remove(conversation);
  }

  // Participant methods
  async addParticipant(conversationId: number, addParticipantDto: AddParticipantDto): Promise<ConversationParticipant> {
    const participant = this.participantRepository.create({
      ...addParticipantDto,
      conversationId,
    });
    return this.participantRepository.save(participant);
  }

  async removeParticipant(conversationId: number, userId: number): Promise<void> {
    const participant = await this.participantRepository.findOne({
      where: { conversationId, userId },
    });

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    await this.participantRepository.remove(participant);
  }

  // Message methods
  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async findMessagesByConversation(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversationId },
      relations: ['sender', 'replyToMessage'],
      order: { createdAt: 'ASC' },
    });
  }

  async findMessageById(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'replyToMessage'],
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  async updateMessage(id: number, body: string): Promise<Message> {
    const message = await this.findMessageById(id);
    message.body = body;
    message.isEdited = true;
    message.editedAt = new Date();
    return this.messageRepository.save(message);
  }

  async deleteMessage(id: number): Promise<void> {
    const message = await this.findMessageById(id);
    await this.messageRepository.remove(message);
  }

  async markAsRead(conversationId: number, userId: number): Promise<void> {
    const participant = await this.participantRepository.findOne({
      where: { conversationId, userId },
    });

    if (participant) {
      participant.lastReadAt = new Date();
      await this.participantRepository.save(participant);
    }
  }
}
