import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
  ) {}

  async create(createListingDto: CreateListingDto): Promise<Listing> {
    const listing = this.listingRepository.create(createListingDto);
    return this.listingRepository.save(listing);
  }

  async findAll(): Promise<Listing[]> {
    return this.listingRepository.find({
      relations: ['item', 'bookings'],
    });
  }

  async findOne(id: number): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['item', 'bookings'],
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    return listing;
  }

  async findByItem(itemId: number): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { itemId },
      relations: ['item', 'bookings'],
    });
  }

  async findByAvailabilityStatus(status: string): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { availabilityStatus: status as any },
      relations: ['item', 'bookings'],
    });
  }

  async findFeatured(): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { isFeatured: true },
      relations: ['item', 'bookings'],
    });
  }

  async update(id: number, updateListingDto: UpdateListingDto): Promise<Listing> {
    const listing = await this.findOne(id);
    Object.assign(listing, updateListingDto);
    return this.listingRepository.save(listing);
  }

  async remove(id: number): Promise<void> {
    const listing = await this.findOne(id);
    await this.listingRepository.remove(listing);
  }

  async incrementViews(id: number): Promise<Listing> {
    const listing = await this.findOne(id);
    listing.viewsCount += 1;
    return this.listingRepository.save(listing);
  }

  async setFeatured(id: number, isFeatured: boolean): Promise<Listing> {
    const listing = await this.findOne(id);
    listing.isFeatured = isFeatured;
    return this.listingRepository.save(listing);
  }

  async updateAvailabilityStatus(id: number, status: string): Promise<Listing> {
    const listing = await this.findOne(id);
    listing.availabilityStatus = status as any;
    return this.listingRepository.save(listing);
  }
}
