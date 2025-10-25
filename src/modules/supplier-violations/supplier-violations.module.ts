import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierViolationsService } from './supplier-violations.service';
import { SupplierViolationsController } from './supplier-violations.controller';
import { SupplierViolation } from './entities/supplier-violation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierViolation])],
  controllers: [SupplierViolationsController],
  providers: [SupplierViolationsService],
  exports: [SupplierViolationsService],
})
export class SupplierViolationsModule {}
