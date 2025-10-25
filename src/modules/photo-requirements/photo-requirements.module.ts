import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoRequirementsService } from './photo-requirements.service';
import { PhotoRequirementsController } from './photo-requirements.controller';
import { PhotoRequirement } from './entities/photo-requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRequirement])],
  controllers: [PhotoRequirementsController],
  providers: [PhotoRequirementsService],
  exports: [PhotoRequirementsService],
})
export class PhotoRequirementsModule {}
