import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';

@Entity('photo_requirements')
@Index(['stage'], { unique: true })
export class PhotoRequirement {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsString()
  stage: string;

  @Column({ type: 'json' })
  requiredFileTypes: string[];

  @Column({ type: 'int' })
  @IsNumber()
  minimumCount: number;

  @Column({ type: 'int' })
  @IsNumber()
  maximumCount: number;

  @Column({ type: 'boolean' })
  @IsBoolean()
  mandatory: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  @IsNumber()
  qualityThreshold: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;
}
