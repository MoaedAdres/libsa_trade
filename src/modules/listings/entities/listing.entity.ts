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
import {
  ListingType,
  PricingUnit,
  AvailabilityStatus,
} from '../../../common/enums';
import { Item } from '../../items/entities/item.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('listings')
@Index(['item_id'])
@Index(['availability_status'])
@Index(['is_featured'])
export class Listing {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  itemId: number;

  @Column({
    type: 'enum',
    enum: ListingType,
  })
  @IsEnum(ListingType)
  type: ListingType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @Column({
    type: 'enum',
    enum: PricingUnit,
  })
  @IsEnum(PricingUnit)
  pricingUnit: PricingUnit;

  @Column({
    type: 'enum',
    enum: AvailabilityStatus,
    default: AvailabilityStatus.AVAILABLE,
  })
  @IsEnum(AvailabilityStatus)
  availabilityStatus: AvailabilityStatus;

  @Column({ type: 'date', nullable: true })
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  @IsOptional()
  @IsDate()
  availableFrom?: Date;

  @Column({ type: 'date', nullable: true })
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  @IsOptional()
  @IsDate()
  availableTo?: Date;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  cancellationPolicy?: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsNumber()
  minRentalDays?: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsNumber()
  maxRentalDays?: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  listingPhotosComplete: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isFeatured: boolean;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  viewsCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Item, (item) => item.listings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @OneToMany(() => Booking, (booking) => booking.listing)
  bookings: Booking[];
}
