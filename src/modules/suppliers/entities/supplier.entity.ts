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
} from 'class-validator';
import { SupplierStatus, VerificationLevel } from '../../../common/enums';
import { User } from '../../users/entities/user.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Item } from '../../items/entities/item.entity';
import { Consignment } from '../../consignments/entities/consignment.entity';
import { Payout } from '../../payments/entities/payout.entity';
import { SupplierViolation } from '../../supplier-violations/entities/supplier-violation.entity';

@Entity('suppliers')
@Index(['user_id'])
@Index(['slug'], { unique: true })
export class Supplier {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  slug: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  visibleContact?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  realContact?: string;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  contactRevealed: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  @IsNumber()
  rating: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  totalReviews: number;

  @Column({
    type: 'enum',
    enum: SupplierStatus,
    default: SupplierStatus.PENDING,
  })
  @IsEnum(SupplierStatus)
  status: SupplierStatus;

  @Column({
    type: 'enum',
    enum: VerificationLevel,
    default: VerificationLevel.NONE,
  })
  @IsEnum(VerificationLevel)
  verificationLevel: VerificationLevel;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.suppliers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Address, (address) => address.supplier)
  addresses: Address[];

  @OneToMany(() => Item, (item) => item.supplier)
  items: Item[];

  @OneToMany(() => Consignment, (consignment) => consignment.supplier)
  consignments: Consignment[];

  @OneToMany(() => Payout, (payout) => payout.supplier)
  payouts: Payout[];

  @OneToMany(() => SupplierViolation, (violation) => violation.supplier)
  violations: SupplierViolation[];
}
