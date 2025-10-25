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
  IsBoolean,
  IsDateString,
  IsDate,
} from 'class-validator';
import { BookingStatus, PaymentMethod } from '../../../common/enums';
import { Listing } from '../../listings/entities/listing.entity';
import { User } from '../../users/entities/user.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Dispute } from '../../disputes/entities/dispute.entity';
import { Conversation } from '../../conversations/entities/conversation.entity';

@Entity('bookings')
@Index(['listing_id'])
@Index(['renter_id'])
@Index(['booking_status'])
export class Booking {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  listingId: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  renterId: number;

  @Column({ type: 'date' })
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  @IsDate()
  startDate: Date;

  @Column({ type: 'date' })
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  @IsDate()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  @IsEnum(BookingStatus)
  bookingStatus: BookingStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  depositPaid: boolean;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  pickupLocationAddressId?: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  dropoffLocationAddressId?: number;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  pickupScheduledAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  returnScheduledAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  contactRevealedAt?: Date;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  cancellationReason?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  pickupPhotosComplete: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  returnPhotosComplete: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Listing, (listing) => listing.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'renter_id' })
  renter: User;

  @ManyToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'pickup_location_address_id' })
  pickupLocation?: Address;

  @ManyToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'dropoff_location_address_id' })
  dropoffLocation?: Address;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];

  @OneToMany(() => Dispute, (dispute) => dispute.booking)
  disputes: Dispute[];

  @OneToMany(() => Conversation, (conversation) => conversation.booking)
  conversations: Conversation[];
}
