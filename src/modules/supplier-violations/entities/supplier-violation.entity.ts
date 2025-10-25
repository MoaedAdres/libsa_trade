import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { ViolationType, Severity } from '../../../common/enums';

@Entity('supplier_violations')
export class SupplierViolation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  supplierId: number;

  @Column({
    type: 'enum',
    enum: ViolationType,
  })
  violationType: ViolationType;

  @Column({
    type: 'enum',
    enum: Severity,
  })
  severity: Severity;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  penaltyAmount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  bookingId: number;

  @Column({ type: 'json', nullable: true })
  evidenceFileIds: number[];

  @Column({ default: false })
  resolved: boolean;

  @Column({ nullable: true })
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  resolvedAt: Date;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @ManyToOne(() => User)
  createdByUser: User;

  @ManyToOne(() => Booking, { nullable: true })
  booking: Booking;
}
