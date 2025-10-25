import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    // Check if slug already exists
    const existingSupplier = await this.supplierRepository.findOne({
      where: { slug: createSupplierDto.slug },
    });

    if (existingSupplier) {
      throw new ConflictException('Supplier with this slug already exists');
    }

    const supplier = this.supplierRepository.create(createSupplierDto);
    return this.supplierRepository.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find({
      relations: ['user', 'addresses'],
    });
  }

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
      relations: ['user', 'addresses', 'items', 'consignments', 'payouts'],
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return supplier;
  }

  async findBySlug(slug: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { slug },
      relations: ['user', 'addresses', 'items'],
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with slug ${slug} not found`);
    }

    return supplier;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);
    
    // Check if slug is being changed and if it already exists
    if (updateSupplierDto.slug && updateSupplierDto.slug !== supplier.slug) {
      const existingSupplier = await this.supplierRepository.findOne({
        where: { slug: updateSupplierDto.slug },
      });
      if (existingSupplier) {
        throw new ConflictException('Supplier with this slug already exists');
      }
    }

    Object.assign(supplier, updateSupplierDto);
    return this.supplierRepository.save(supplier);
  }

  async remove(id: number): Promise<void> {
    const supplier = await this.findOne(id);
    await this.supplierRepository.remove(supplier);
  }

  async updateRating(id: number, newRating: number): Promise<Supplier> {
    const supplier = await this.findOne(id);
    supplier.rating = newRating;
    supplier.totalReviews += 1;
    return this.supplierRepository.save(supplier);
  }

  async updateStatus(id: number, status: string): Promise<Supplier> {
    const supplier = await this.findOne(id);
    supplier.status = status as any;
    return this.supplierRepository.save(supplier);
  }
}
