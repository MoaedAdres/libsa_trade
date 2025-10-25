import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoRequirement } from './entities/photo-requirement.entity';
import { CreatePhotoRequirementDto } from './dto/create-photo-requirement.dto';
import { UpdatePhotoRequirementDto } from './dto/update-photo-requirement.dto';

@Injectable()
export class PhotoRequirementsService {
  constructor(
    @InjectRepository(PhotoRequirement)
    private photoRequirementRepository: Repository<PhotoRequirement>,
  ) {}

  async create(createPhotoRequirementDto: CreatePhotoRequirementDto): Promise<PhotoRequirement> {
    const photoRequirement = this.photoRequirementRepository.create(createPhotoRequirementDto);
    return this.photoRequirementRepository.save(photoRequirement);
  }

  async findAll(): Promise<PhotoRequirement[]> {
    return this.photoRequirementRepository.find();
  }

  async findOne(id: number): Promise<PhotoRequirement> {
    const photoRequirement = await this.photoRequirementRepository.findOne({
      where: { id },
    });

    if (!photoRequirement) {
      throw new NotFoundException(`Photo requirement with ID ${id} not found`);
    }

    return photoRequirement;
  }

  async findByStage(stage: string): Promise<PhotoRequirement> {
    const photoRequirement = await this.photoRequirementRepository.findOne({
      where: { stage },
    });

    if (!photoRequirement) {
      throw new NotFoundException(`Photo requirement for stage ${stage} not found`);
    }

    return photoRequirement;
  }

  async update(id: number, updatePhotoRequirementDto: UpdatePhotoRequirementDto): Promise<PhotoRequirement> {
    const photoRequirement = await this.findOne(id);
    Object.assign(photoRequirement, updatePhotoRequirementDto);
    return this.photoRequirementRepository.save(photoRequirement);
  }

  async remove(id: number): Promise<void> {
    const photoRequirement = await this.findOne(id);
    await this.photoRequirementRepository.remove(photoRequirement);
  }
}
