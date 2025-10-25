import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
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
import { OwnerType } from '../../../common/enums';
import { User } from '../../users/entities/user.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';

@Entity('addresses')
@Index(['owner_type', 'owner_id'])
export class Address {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'enum',
    enum: OwnerType,
  })
  @IsEnum(OwnerType)
  ownerType: OwnerType;

  @Column({ type: 'bigint' })
  @IsNumber()
  ownerId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  label?: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  line1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  line2?: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  city: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  region: string;

  @Column({ type: 'varchar', length: 20 })
  @IsString()
  postalCode: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  country: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  @IsOptional()
  @IsNumber()
  lng?: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  updatedAt: Date;

  // Polymorphic relationships
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => Supplier, { nullable: true })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  supplier?: Supplier;
}
