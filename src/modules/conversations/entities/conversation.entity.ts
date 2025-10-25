import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ConversationStatus } from '../../../common/enums';
import { Booking } from '../../bookings/entities/booking.entity';
import { User } from '../../users/entities/user.entity';
import { ConversationParticipant } from '../../conversation-participants/entities/conversation-participant.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('conversations')
@Index(['booking_id'])
@Index(['created_by'])
@Index(['status'])
export class Conversation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  subject?: string;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  bookingId?: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  createdBy: number;

  @Column({
    type: 'enum',
    enum: ConversationStatus,
    default: ConversationStatus.ACTIVE,
  })
  @IsEnum(ConversationStatus)
  status: ConversationStatus;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Booking, (booking) => booking.conversations, {
    nullable: true,
  })
  @JoinColumn({ name: 'booking_id' })
  booking?: Booking;

  @ManyToOne(() => User, (user) => user.conversationParticipants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @OneToMany(
    () => ConversationParticipant,
    (participant) => participant.conversation,
  )
  participants: ConversationParticipant[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
