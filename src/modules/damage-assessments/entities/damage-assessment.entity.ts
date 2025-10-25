import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Dispute } from '../../disputes/entities/dispute.entity';
import { User } from '../../users/entities/user.entity';

@Entity('damage_assessments')
export class DamageAssessment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  disputeId: number;

  @Column()
  assessedBy: number;

  @Column()
  damageLocation: string;

  @Column()
  damageType: string;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  severityScore: number;

  @Column()
  repairFeasible: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  estimatedRepairCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  replacementCost: number;

  @Column({ type: 'text', nullable: true })
  assessmentNotes: string;

  @Column({ type: 'json', nullable: true })
  beforePhotoIds: number[];

  @Column({ type: 'json', nullable: true })
  afterPhotoIds: number[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Dispute)
  dispute: Dispute;

  @ManyToOne(() => User)
  assessedByUser: User;
}
