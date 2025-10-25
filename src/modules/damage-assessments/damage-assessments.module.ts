import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DamageAssessmentsService } from './damage-assessments.service';
import { DamageAssessmentsController } from './damage-assessments.controller';
import { DamageAssessment } from './entities/damage-assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DamageAssessment])],
  controllers: [DamageAssessmentsController],
  providers: [DamageAssessmentsService],
  exports: [DamageAssessmentsService],
})
export class DamageAssessmentsModule {}
