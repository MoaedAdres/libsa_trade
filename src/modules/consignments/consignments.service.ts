import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consignment } from './entities/consignment.entity';
import { CreateConsignmentDto } from './dto/create-consignment.dto';
import { UpdateConsignmentDto } from './dto/update-consignment.dto';

@Injectable()
export class ConsignmentsService {
  constructor(
    @InjectRepository(Consignment)
    private consignmentRepository: Repository<Consignment>,
  ) {}

  async create(createConsignmentDto: CreateConsignmentDto): Promise<Consignment> {
    const consignment = this.consignmentRepository.create(createConsignmentDto);
    return this.consignmentRepository.save(consignment);
  }

  async findAll(): Promise<Consignment[]> {
    return this.consignmentRepository.find({
      relations: ['owner', 'supplier', 'signedAgreementFile', 'ownerIdScanFile', 'intakeByUser', 'returnByUser', 'items'],
    });
  }

  async findOne(id: number): Promise<Consignment> {
    const consignment = await this.consignmentRepository.findOne({
      where: { id },
      relations: ['owner', 'supplier', 'signedAgreementFile', 'ownerIdScanFile', 'intakeByUser', 'returnByUser', 'items'],
    });

    if (!consignment) {
      throw new NotFoundException(`Consignment with ID ${id} not found`);
    }

    return consignment;
  }

  async findByOwner(ownerUserId: number): Promise<Consignment[]> {
    return this.consignmentRepository.find({
      where: { ownerUserId },
      relations: ['owner', 'supplier', 'items'],
    });
  }

  async findBySupplier(supplierId: number): Promise<Consignment[]> {
    return this.consignmentRepository.find({
      where: { supplierId },
      relations: ['owner', 'supplier', 'items'],
    });
  }

  async update(id: number, updateConsignmentDto: UpdateConsignmentDto): Promise<Consignment> {
    const consignment = await this.findOne(id);
    Object.assign(consignment, updateConsignmentDto);
    return this.consignmentRepository.save(consignment);
  }

  async remove(id: number): Promise<void> {
    const consignment = await this.findOne(id);
    await this.consignmentRepository.remove(consignment);
  }

  async startIntake(id: number, intakeBy: number): Promise<Consignment> {
    const consignment = await this.findOne(id);
    consignment.status = 'intake' as any;
    consignment.intakeAt = new Date();
    consignment.intakeBy = intakeBy;
    return this.consignmentRepository.save(consignment);
  }

  async completeIntake(id: number): Promise<Consignment> {
    const consignment = await this.findOne(id);
    consignment.status = 'active' as any;
    consignment.intakePhotosComplete = true;
    return this.consignmentRepository.save(consignment);
  }

  async returnConsignment(id: number, returnBy: number): Promise<Consignment> {
    const consignment = await this.findOne(id);
    consignment.status = 'returned' as any;
    consignment.returnAt = new Date();
    consignment.returnBy = returnBy;
    return this.consignmentRepository.save(consignment);
  }
}
