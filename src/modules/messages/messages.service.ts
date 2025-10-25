import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  async findByConversation(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
    });
  }

  async findBySender(senderId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { senderId },
    });
  }

  async findReplies(messageId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { replyToMessageId: messageId },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.findOne(id);
    Object.assign(message, updateMessageDto);
    message.isEdited = true;
    message.editedAt = new Date();
    return this.messageRepository.save(message);
  }

  async remove(id: number): Promise<void> {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
  }

  async redact(id: number, reason: string): Promise<Message> {
    const message = await this.findOne(id);
    message.isRedacted = true;
    message.redactedReason = reason;
    message.body = '[REDACTED]';
    return this.messageRepository.save(message);
  }

  async flagContact(id: number): Promise<Message> {
    const message = await this.findOne(id);
    message.hasContactFlag = true;
    return this.messageRepository.save(message);
  }
}
