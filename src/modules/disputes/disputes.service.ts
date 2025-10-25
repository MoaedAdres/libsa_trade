import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './entities/dispute.entity';
import { DamageAssessment } from '../damage-assessments/entities/damage-assessment.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { CreateDamageAssessmentDto } from './dto/create-damage-assessment.dto';

@Injectable()
export class DisputesService {
  constructor(
    @InjectRepository(Dispute)
    private disputeRepository: Repository<Dispute>,
    @InjectRepository(DamageAssessment)
    private damageAssessmentRepository: Repository<DamageAssessment>,
  ) {}

  // Dispute methods
  async create(createDisputeDto: CreateDisputeDto): Promise<Dispute> {
    const dispute = this.disputeRepository.create(createDisputeDto);
    return this.disputeRepository.save(dispute);
  }

  async findAll(): Promise<Dispute[]> {
    return this.disputeRepository.find({
      relations: ['booking', 'raisedByUser', 'assignedToUser', 'damageAssessments'],
    });
  }

  async findOne(id: number): Promise<Dispute> {
    const dispute = await this.disputeRepository.findOne({
      where: { id },
      relations: ['booking', 'raisedByUser', 'assignedToUser', 'damageAssessments'],
    });

    if (!dispute) {
      throw new NotFoundException(`Dispute with ID ${id} not found`);
    }

    return dispute;
  }

  async findByBooking(bookingId: number): Promise<Dispute[]> {
    return this.disputeRepository.find({
      where: { bookingId },
      relations: ['booking', 'raisedByUser', 'assignedToUser', 'damageAssessments'],
    });
  }

  async findByStatus(status: string): Promise<Dispute[]> {
    return this.disputeRepository.find({
      where: { status: status as any },
      relations: ['booking', 'raisedByUser', 'assignedToUser', 'damageAssessments'],
    });
  }

  async update(id: number, updateDisputeDto: UpdateDisputeDto): Promise<Dispute> {
    const dispute = await this.findOne(id);
    Object.assign(dispute, updateDisputeDto);
    return this.disputeRepository.save(dispute);
  }

  async remove(id: number): Promise<void> {
    const dispute = await this.findOne(id);
    await this.disputeRepository.remove(dispute);
  }

  async assignDispute(id: number, assignedTo: number): Promise<Dispute> {
    const dispute = await this.findOne(id);
    dispute.assignedTo = assignedTo;
    return this.disputeRepository.save(dispute);
  }

  async resolveDispute(id: number, resolutionSummary: string): Promise<Dispute> {
    const dispute = await this.findOne(id);
    dispute.status = 'resolved' as any;
    dispute.resolutionSummary = resolutionSummary;
    dispute.resolvedAt = new Date();
    return this.disputeRepository.save(dispute);
  }

  // Damage Assessment methods
  async createDamageAssessment(createDto: CreateDamageAssessmentDto): Promise<DamageAssessment> {
    const assessment = this.damageAssessmentRepository.create(createDto);
    return this.damageAssessmentRepository.save(assessment);
  }

  async findDamageAssessmentsByDispute(disputeId: number): Promise<DamageAssessment[]> {
    return this.damageAssessmentRepository.find({
      where: { disputeId },
      relations: ['dispute', 'assessedByUser'],
    });
  }

  async findDamageAssessmentById(id: number): Promise<DamageAssessment> {
    const assessment = await this.damageAssessmentRepository.findOne({
      where: { id },
      relations: ['dispute', 'assessedByUser'],
    });

    if (!assessment) {
      throw new NotFoundException(`Damage assessment with ID ${id} not found`);
    }

    return assessment;
  }
}
