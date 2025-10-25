import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
} from 'class-validator';
import { ItemCategory, ConditionRating } from '../../../common/enums';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Consignment } from '../../consignments/entities/consignment.entity';
import { Listing } from '../../listings/entities/listing.entity';

@Entity('items')
@Index(['supplier_id'])
@Index(['sku'])
@Index(['category'])
export class Item {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  supplierId: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  sku?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @IsString()
  size?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  brand?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Column({
    type: 'enum',
    enum: ItemCategory,
  })
  @IsEnum(ItemCategory)
  category: ItemCategory;

  @Column({
    type: 'enum',
    enum: ConditionRating,
  })
  @IsEnum(ConditionRating)
  conditionRating: ConditionRating;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  estimatedValue?: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isConsignment: boolean;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  consignmentId?: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  intakeComplete: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  listingApproved: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  deletedAt?: Date;

  // Relationships
  @ManyToOne(() => Supplier, (supplier) => supplier.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToOne(() => Consignment, (consignment) => consignment.items, {
    nullable: true,
  })
  @JoinColumn({ name: 'consignment_id' })
  consignment?: Consignment;

  @OneToMany(() => Listing, (listing) => listing.item)
  listings: Listing[];
}
