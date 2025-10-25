import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierViolation } from './entities/supplier-violation.entity';
import { CreateSupplierViolationDto } from './dto/create-supplier-violation.dto';
import { UpdateSupplierViolationDto } from './dto/update-supplier-violation.dto';

@Injectable()
export class SupplierViolationsService {
  constructor(
    @InjectRepository(SupplierViolation)
    private supplierViolationRepository: Repository<SupplierViolation>,
  ) {}

  async create(createSupplierViolationDto: CreateSupplierViolationDto): Promise<SupplierViolation> {
    const supplierViolation = this.supplierViolationRepository.create(createSupplierViolationDto);
    return this.supplierViolationRepository.save(supplierViolation);
  }

  async findAll(): Promise<SupplierViolation[]> {
    return this.supplierViolationRepository.find();
  }

  async findOne(id: number): Promise<SupplierViolation> {
    const supplierViolation = await this.supplierViolationRepository.findOne({
      where: { id },
    });

    if (!supplierViolation) {
      throw new NotFoundException(`Supplier violation with ID ${id} not found`);
    }

    return supplierViolation;
  }

  async findBySupplier(supplierId: number): Promise<SupplierViolation[]> {
    return this.supplierViolationRepository.find({
      where: { supplierId },
    });
  }

  async findByBooking(bookingId: number): Promise<SupplierViolation[]> {
    return this.supplierViolationRepository.find({
      where: { bookingId },
    });
  }

  async findUnresolved(): Promise<SupplierViolation[]> {
    return this.supplierViolationRepository.find({
      where: { resolved: false },
    });
  }

  async update(id: number, updateSupplierViolationDto: UpdateSupplierViolationDto): Promise<SupplierViolation> {
    const supplierViolation = await this.findOne(id);
    Object.assign(supplierViolation, updateSupplierViolationDto);
    return this.supplierViolationRepository.save(supplierViolation);
  }

  async remove(id: number): Promise<void> {
    const supplierViolation = await this.findOne(id);
    await this.supplierViolationRepository.remove(supplierViolation);
  }

  async resolve(id: number): Promise<SupplierViolation> {
    const supplierViolation = await this.findOne(id);
    supplierViolation.resolved = true;
    supplierViolation.resolvedAt = new Date();
    return this.supplierViolationRepository.save(supplierViolation);
  }
}
