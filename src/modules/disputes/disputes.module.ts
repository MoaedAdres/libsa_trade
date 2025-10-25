import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisputesService } from './disputes.service';
import { DisputesController } from './disputes.controller';
import { Dispute } from './entities/dispute.entity';
import { DamageAssessment } from '../damage-assessments/entities/damage-assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dispute, DamageAssessment])],
  controllers: [DisputesController],
  providers: [DisputesService],
  exports: [DisputesService],
})
export class DisputesModule {}
