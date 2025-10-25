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
import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Entity('audit_logs')
@Index(['actor_id'])
@Index(['target_type', 'target_id'])
@Index(['action'])
@Index(['created_at'])
export class AuditLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @IsNumber()
  actorId: number;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  action: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  targetType: string;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  @IsNumber()
  targetId?: number;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  oldValues?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  newValues?: Record<string, any>;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value?.toISOString())
  @IsDateString()
  createdAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.auditLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'actor_id' })
  actor: User;
}
