import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';
import { MessageType } from '../../../common/enums';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  conversationId: number;

  @Column()
  senderId: number;

  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  messageType: MessageType;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column({ default: false })
  isRedacted: boolean;

  @Column({ nullable: true })
  redactedReason: string;

  @Column({ default: false })
  hasContactFlag: boolean;

  @Column({ type: 'json', nullable: true })
  attachmentFileIds: number[];

  @Column({ nullable: true })
  replyToMessageId: number;

  @Column({ default: false })
  isEdited: boolean;

  @Column({ nullable: true })
  editedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Conversation)
  conversation: Conversation;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => Message, { nullable: true })
  replyToMessage: Message;
}
