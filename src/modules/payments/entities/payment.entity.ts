import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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
import { PaymentType, PaymentStatus, RelatedType } from '../../../common/enums';
import { Booking } from '../../bookings/entities/booking.entity';
import { User } from '../../users/entities/user.entity';

@Entity('payments')
@Index(['booking_id'])
@Index(['processed_by'])
@Index(['status'])
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  bookingId: number;

  @Column({
    type: 'enum',
    enum: RelatedType,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(RelatedType)
  relatedType?: RelatedType;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  relatedId?: number;

  @Column({
    type: 'enum',
    enum: PaymentType,
  })
  @IsEnum(PaymentType)
  type: PaymentType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  amount: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  @IsString()
  currency: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  method: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  gatewayReference?: string;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  processedBy?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  processingFee: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  completedAt?: Date;

  // Relationships
  @ManyToOne(() => Booking, (booking) => booking.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'processed_by' })
  processedByUser?: User;
}
