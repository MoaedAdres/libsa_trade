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
import {
  DisputeType,
  DamageCategory,
  DisputeStatus,
  DisputePriority,
} from '../../../common/enums';
import { Booking } from '../../bookings/entities/booking.entity';
import { User } from '../../users/entities/user.entity';
import { DamageAssessment } from '../../damage-assessments/entities/damage-assessment.entity';

@Entity('disputes')
@Index(['booking_id'])
@Index(['raised_by'])
@Index(['assigned_to'])
@Index(['status'])
export class Dispute {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  bookingId: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  raisedBy: number;

  @Column({
    type: 'enum',
    enum: DisputeType,
  })
  @IsEnum(DisputeType)
  disputeType: DisputeType;

  @Column({
    type: 'enum',
    enum: DamageCategory,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(DamageCategory)
  damageCategory?: DamageCategory;

  @Column({
    type: 'enum',
    enum: DisputeStatus,
    default: DisputeStatus.OPEN,
  })
  @IsEnum(DisputeStatus)
  status: DisputeStatus;

  @Column({
    type: 'enum',
    enum: DisputePriority,
    default: DisputePriority.MEDIUM,
  })
  @IsEnum(DisputePriority)
  priority: DisputePriority;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  claimedAmount?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  approvedAmount?: number;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  liabilitySplit?: Record<string, any>;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  resolutionSummary?: string;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  evidenceFileIds?: number[];

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  assignedTo?: number;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  mustResolveBy?: Date;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  escalationLevel: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  resolvedAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Booking, (booking) => booking.disputes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToOne(() => User, (user) => user.disputes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raised_by' })
  raisedByUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedToUser?: User;

  @OneToMany(() => DamageAssessment, (assessment) => assessment.dispute)
  damageAssessments: DamageAssessment[];
}
