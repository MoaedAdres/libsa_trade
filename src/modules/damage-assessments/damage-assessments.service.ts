import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DamageAssessment } from './entities/damage-assessment.entity';
import { CreateDamageAssessmentDto } from './dto/create-damage-assessment.dto';
import { UpdateDamageAssessmentDto } from './dto/update-damage-assessment.dto';

@Injectable()
export class DamageAssessmentsService {
  constructor(
    @InjectRepository(DamageAssessment)
    private damageAssessmentRepository: Repository<DamageAssessment>,
  ) {}

  async create(createDamageAssessmentDto: CreateDamageAssessmentDto): Promise<DamageAssessment> {
    const damageAssessment = this.damageAssessmentRepository.create(createDamageAssessmentDto);
    return this.damageAssessmentRepository.save(damageAssessment);
  }

  async findAll(): Promise<DamageAssessment[]> {
    return this.damageAssessmentRepository.find();
  }

  async findOne(id: number): Promise<DamageAssessment> {
    const damageAssessment = await this.damageAssessmentRepository.findOne({
      where: { id },
    });

    if (!damageAssessment) {
      throw new NotFoundException(`Damage assessment with ID ${id} not found`);
    }

    return damageAssessment;
  }

  async findByDispute(disputeId: number): Promise<DamageAssessment[]> {
    return this.damageAssessmentRepository.find({
      where: { disputeId },
    });
  }

  async findByAssessor(assessedBy: number): Promise<DamageAssessment[]> {
    return this.damageAssessmentRepository.find({
      where: { assessedBy },
    });
  }

  async update(id: number, updateDamageAssessmentDto: UpdateDamageAssessmentDto): Promise<DamageAssessment> {
    const damageAssessment = await this.findOne(id);
    Object.assign(damageAssessment, updateDamageAssessmentDto);
    return this.damageAssessmentRepository.save(damageAssessment);
  }

  async remove(id: number): Promise<void> {
    const damageAssessment = await this.findOne(id);
    await this.damageAssessmentRepository.remove(damageAssessment);
  }
}
