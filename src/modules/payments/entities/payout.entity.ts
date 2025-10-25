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
  IsDate,
} from 'class-validator';
import { PayoutStatus, PayoutPaymentMethod } from '../../../common/enums';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { User } from '../../users/entities/user.entity';

@Entity('payouts')
@Index(['supplier_id'])
@Index(['processed_by'])
@Index(['status'])
export class Payout {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  supplierId: number;

  @Column({ type: 'date' })
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  @IsDate()
  payoutPeriodStart: Date;

  @Column({ type: 'date' })
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  @IsDate()
  payoutPeriodEnd: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  grossAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  platformFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  penalties: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  netAmount: number;

  @Column({
    type: 'enum',
    enum: PayoutStatus,
    default: PayoutStatus.PENDING,
  })
  @IsEnum(PayoutStatus)
  status: PayoutStatus;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  holdUntil?: Date;

  @Column({
    type: 'enum',
    enum: PayoutPaymentMethod,
  })
  @IsEnum(PayoutPaymentMethod)
  paymentMethod: PayoutPaymentMethod;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  bankDetails?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  includedBookingIds?: number[];

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  processedBy?: number;

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
  @ManyToOne(() => Supplier, (supplier) => supplier.payouts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'processed_by' })
  processedByUser?: User;
}
