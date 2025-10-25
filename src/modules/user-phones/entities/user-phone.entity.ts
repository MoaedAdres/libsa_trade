import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('user_phones')
export class UserPhone {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  userId: number;

  @Column()
  phone: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verificationSentAt: Date;

  @Column({ nullable: true })
  verifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.phones)
  user: User;
}
