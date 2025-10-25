import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import sharp from 'sharp';
import { File } from './entities/file.entity';
import { FileOwnerType, FileType } from '../../common/enums';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private configService: ConfigService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    ownerType: FileOwnerType,
    ownerId: number,
    fileType: FileType,
    uploadedBy: number,
  ): Promise<File> {
    // Validate file
    this.validateFile(file);

    // Calculate checksum
    const checksum = await this.calculateChecksum(file.buffer);

    // Check for duplicates
    const existing = await this.fileRepository.findOne({ where: { checksum } });
    if (existing) {
      return existing; // Reuse existing file
    }

    // Save file to disk
    const relativePath = await this.saveFileToDisk(file, ownerType);

    // Extract metadata
    const metadata = await this.extractMetadata(file);

    // Calculate quality score
    const qualityScore = await this.calculateQualityScore(file);

    // Create database record
    const fileEntity = this.fileRepository.create({
      ownerType,
      ownerId,
      fileType,
      path: relativePath,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      checksum,
      uploadedBy,
      capturedAt: metadata.capturedAt || new Date(),
      qualityScore,
      metadata,
      isProcessed: true,
    });

    return this.fileRepository.save(fileEntity) as Promise<File>;
  }

  async getFilesForEntity(ownerType: FileOwnerType, ownerId: number): Promise<File[]> {
    return this.fileRepository.find({
      where: { ownerType, ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteFile(id: number): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new BadRequestException('File not found');
    }

    // Delete file from disk
    await this.deleteFileFromDisk(file.path);

    // Delete database record
    await this.fileRepository.remove(file);
  }

  private validateFile(file: Express.Multer.File): void {
    const maxSize = this.configService.get('MAX_FILE_SIZE', 5242880); // 5MB
    const allowedImageTypes = this.configService.get('ALLOWED_IMAGE_TYPES', 'image/jpeg,image/png,image/webp').split(',');
    const allowedDocTypes = this.configService.get('ALLOWED_DOC_TYPES', 'application/pdf').split(',');
    const allowedTypes = [...allowedImageTypes, ...allowedDocTypes];

    if (file.size > maxSize) {
      throw new BadRequestException('File size too large');
    }

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
  }

  private async calculateChecksum(buffer: Buffer): Promise<string> {
    const hash = crypto.createHash('sha256');
    hash.update(buffer);
    return hash.digest('hex');
  }

  private async saveFileToDisk(file: Express.Multer.File, ownerType: FileOwnerType): Promise<string> {
    const uploadDir = this.configService.get('UPLOAD_DIR', './uploads');
    const fileName = `${Date.now()}-${file.originalname}`;
    const relativePath = `${ownerType}/${fileName}`;
    
    // In a real implementation, you would save the file to disk here
    // For now, we'll just return the relative path
    return relativePath;
  }

  private async extractMetadata(file: Express.Multer.File): Promise<Record<string, any>> {
    const metadata: Record<string, any> = {};

    if (file.mimetype.startsWith('image/')) {
      try {
        const imageMetadata = await sharp(file.buffer).metadata();
        metadata.width = imageMetadata.width;
        metadata.height = imageMetadata.height;
        metadata.format = imageMetadata.format;
        metadata.density = imageMetadata.density;
        metadata.hasAlpha = imageMetadata.hasAlpha;
        metadata.orientation = imageMetadata.orientation;
      } catch (error) {
        // If sharp fails, continue without metadata
      }
    }

    return metadata;
  }

  private async calculateQualityScore(file: Express.Multer.File): Promise<number> {
    if (!file.mimetype.startsWith('image/')) {
      return 1.0; // Non-images get perfect score
    }

    try {
      const image = sharp(file.buffer);
      const { width, height } = await image.metadata();
      
      // Basic quality scoring based on resolution
      const minDimension = Math.min(width || 0, height || 0);
      const maxDimension = Math.max(width || 0, height || 0);
      
      // Score based on minimum dimension (higher is better)
      let score = Math.min(minDimension / 1000, 1.0);
      
      // Penalize if aspect ratio is too extreme
      const aspectRatio = maxDimension / minDimension;
      if (aspectRatio > 3) {
        score *= 0.8;
      }
      
      return Math.max(score, 0.1); // Minimum score of 0.1
    } catch (error) {
      return 0.5; // Default score if processing fails
    }
  }

  private async deleteFileFromDisk(path: string): Promise<void> {
    // In a real implementation, you would delete the file from disk here
    // For now, we'll just log the action
    console.log(`Would delete file: ${path}`);
  }
}
