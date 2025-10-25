import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoRequirement } from '../photo-requirements/entities/photo-requirement.entity';
import { File } from '../files/entities/file.entity';
import { FileType } from '../../common/enums';

export interface ValidationResult {
  valid: boolean;
  message: string;
  errors?: string[];
}

@Injectable()
export class PhotoValidationService {
  constructor(
    @InjectRepository(PhotoRequirement)
    private photoRequirementsRepository: Repository<PhotoRequirement>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async validateStagePhotos(
    stage: string,
    fileIds: number[],
  ): Promise<ValidationResult> {
    const requirement = await this.photoRequirementsRepository.findOne({
      where: { stage },
    });

    if (!requirement) {
      throw new NotFoundException(
        `No photo requirements found for stage: ${stage}`,
      );
    }

    // Get file details
    const files = await this.fileRepository.findByIds(fileIds);

    if (files.length !== fileIds.length) {
      throw new BadRequestException('Some files not found');
    }

    const errors: string[] = [];

    // Check minimum count
    if (files.length < requirement.minimumCount) {
      errors.push(
        `Need at least ${requirement.minimumCount} photos, got ${files.length}`,
      );
    }

    // Check maximum count
    if (files.length > requirement.maximumCount) {
      errors.push(
        `Maximum ${requirement.maximumCount} photos allowed, got ${files.length}`,
      );
    }

    // Check required file types
    const requiredTypes = requirement.requiredFileTypes;
    const uploadedTypes = files.map((f) => f.fileType);

    for (const requiredType of requiredTypes) {
      if (!uploadedTypes.includes(requiredType as FileType)) {
        errors.push(`Missing required file type: ${requiredType}`);
      }
    }

    // Check quality scores
    const lowQualityFiles = files.filter(
      (f) => f.qualityScore && f.qualityScore < requirement.qualityThreshold,
    );

    if (lowQualityFiles.length > 0) {
      errors.push(
        `${lowQualityFiles.length} photos do not meet quality standards (threshold: ${requirement.qualityThreshold})`,
      );
    }

    // Check if mandatory
    if (requirement.mandatory && errors.length > 0) {
      return {
        valid: false,
        message: 'Photo requirements not met',
        errors,
      };
    }

    return {
      valid: errors.length === 0,
      message:
        errors.length === 0
          ? 'All photos validated successfully'
          : 'Some requirements not met',
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async getPhotoRequirements(stage: string): Promise<PhotoRequirement> {
    const requirement = await this.photoRequirementsRepository.findOne({
      where: { stage },
    });

    if (!requirement) {
      throw new NotFoundException(
        `No photo requirements found for stage: ${stage}`,
      );
    }

    return requirement;
  }

  async getAllPhotoRequirements(): Promise<PhotoRequirement[]> {
    return this.photoRequirementsRepository.find();
  }
}
