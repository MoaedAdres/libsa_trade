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
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { FileOwnerType, FileType } from '../../../common/enums';
import { User } from '../../users/entities/user.entity';

@Entity('files')
@Index(['owner_type', 'owner_id'])
@Index(['checksum'])
@Index(['uploaded_by'])
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'enum',
    enum: FileOwnerType,
  })
  @IsEnum(FileOwnerType)
  ownerType: FileOwnerType;

  @Column({ type: 'bigint' })
  @IsNumber()
  ownerId: number;

  @Column({
    type: 'enum',
    enum: FileType,
  })
  @IsEnum(FileType)
  fileType: FileType;

  @Column({ type: 'varchar', length: 500 })
  @IsString()
  path: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  originalFilename: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  mimeType: string;

  @Column({ type: 'bigint' })
  @IsNumber()
  sizeBytes: number;

  @Column({ type: 'varchar', length: 64 })
  @IsString()
  checksum: string;

  @Column({ type: 'bigint' })
  @IsNumber()
  uploadedBy: number;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  @IsDateString()
  capturedAt?: Date;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  qualityScore?: number;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  metadata?: Record<string, any>;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isProcessed: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isPublic: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  // Relationships
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uploaded_by' })
  uploadedByUser: User;
}
