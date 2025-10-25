import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsString,
  IsDateString,
} from 'class-validator';
import { UserRole } from '../../../common/enums';
import { UserPhone } from './user-phone.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Consignment } from '../../consignments/entities/consignment.entity';
import { AuditLog } from '../../audit/entities/audit-log.entity';
import { Message } from '../../messages/entities/message.entity';
import { Dispute } from '../../disputes/entities/dispute.entity';
import { ConversationParticipant } from '../../conversation-participants/entities/conversation-participant.entity';
import { SupplierViolation } from '../../supplier-violations/entities/supplier-violation.entity';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  @IsString()
  passwordHash: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isEmailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isPhoneVerified: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @IsString()
  oauthProvider?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @IsOptional()
  @IsString()
  avatarPath?: string;

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
  @OneToMany(() => UserPhone, (phone) => phone.user)
  phones: UserPhone[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Supplier, (supplier) => supplier.user)
  suppliers: Supplier[];

  @OneToMany(() => Booking, (booking) => booking.renter)
  bookings: Booking[];

  @OneToMany(() => Consignment, (consignment) => consignment.owner)
  consignments: Consignment[];

  @OneToMany(() => AuditLog, (auditLog) => auditLog.actor)
  auditLogs: AuditLog[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Dispute, (dispute) => dispute.raisedBy)
  disputes: Dispute[];

  @OneToMany(() => ConversationParticipant, (participant) => participant.user)
  conversationParticipants: ConversationParticipant[];

  @OneToMany(() => SupplierViolation, (violation) => violation.createdBy)
  supplierViolations: SupplierViolation[];
}
