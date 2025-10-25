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
import { ConsignmentStatus } from '../../../common/enums';
import { User } from '../../users/entities/user.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { File } from '../../files/entities/file.entity';
import { Item } from '../../items/entities/item.entity';

@Entity('consignments')
@Index(['owner_user_id'])
@Index(['supplier_id'])
@Index(['status'])
export class Consignment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  ownerUserId: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  supplierId: number;

  @Column({
    type: 'enum',
    enum: ConsignmentStatus,
    default: ConsignmentStatus.PENDING,
  })
  @IsEnum(ConsignmentStatus)
  status: ConsignmentStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @IsNumber()
  commissionRate: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  signedAgreementFileId?: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  ownerIdScanFileId?: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  intakePhotosComplete: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  intakeAt?: Date;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  intakeBy?: number;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  returnAt?: Date;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  returnBy?: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.consignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_user_id' })
  owner: User;

  @ManyToOne(() => Supplier, (supplier) => supplier.consignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'signed_agreement_file_id' })
  signedAgreementFile?: File;

  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'owner_id_scan_file_id' })
  ownerIdScanFile?: File;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'intake_by' })
  intakeByUser?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'return_by' })
  returnByUser?: User;

  @OneToMany(() => Item, (item) => item.consignment)
  items: Item[];
}
