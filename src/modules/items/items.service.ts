import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: ['supplier', 'consignment', 'listings'],
    });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['supplier', 'consignment', 'listings'],
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async findBySupplier(supplierId: number): Promise<Item[]> {
    return this.itemRepository.find({
      where: { supplierId },
      relations: ['supplier', 'consignment', 'listings'],
    });
  }

  async findByCategory(category: string): Promise<Item[]> {
    return this.itemRepository.find({
      where: { category: category as any },
      relations: ['supplier', 'consignment', 'listings'],
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    Object.assign(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepository.softDelete(id);
  }

  async approveListing(id: number): Promise<Item> {
    const item = await this.findOne(id);
    item.listingApproved = true;
    return this.itemRepository.save(item);
  }

  async completeIntake(id: number): Promise<Item> {
    const item = await this.findOne(id);
    item.intakeComplete = true;
    return this.itemRepository.save(item);
  }
}
