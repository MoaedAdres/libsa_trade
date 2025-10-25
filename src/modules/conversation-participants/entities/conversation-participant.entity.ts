import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';
import { ParticipantRole } from '../../../common/enums';

@Entity('conversation_participants')
export class ConversationParticipant {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  conversationId: number;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: ParticipantRole,
  })
  role: ParticipantRole;

  @Column({ default: false })
  isMuted: boolean;

  @Column({ nullable: true })
  lastReadAt: Date;

  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => Conversation)
  conversation: Conversation;

  @ManyToOne(() => User)
  user: User;
}
