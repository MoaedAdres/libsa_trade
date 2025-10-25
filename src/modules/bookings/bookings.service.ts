import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    // Validate booking dates
    if (createBookingDto.startDate >= createBookingDto.endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    const booking = this.bookingRepository.create(createBookingDto);
    return this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['listing', 'renter', 'pickupLocation', 'dropoffLocation'],
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['listing', 'renter', 'pickupLocation', 'dropoffLocation', 'payments', 'disputes'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async findByRenter(renterId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { renterId },
      relations: ['listing', 'renter', 'pickupLocation', 'dropoffLocation'],
    });
  }

  async findByListing(listingId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { listingId },
      relations: ['listing', 'renter', 'pickupLocation', 'dropoffLocation'],
    });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);
    Object.assign(booking, updateBookingDto);
    return this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    const booking = await this.findOne(id);
    await this.bookingRepository.remove(booking);
  }

  async confirmBooking(id: number): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.bookingStatus = 'confirmed' as any;
    return this.bookingRepository.save(booking);
  }

  async cancelBooking(id: number, reason: string): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.bookingStatus = 'cancelled' as any;
    booking.cancellationReason = reason;
    return this.bookingRepository.save(booking);
  }

  async completeBooking(id: number): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.bookingStatus = 'completed' as any;
    return this.bookingRepository.save(booking);
  }

  async revealContact(id: number): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.contactRevealedAt = new Date();
    return this.bookingRepository.save(booking);
  }
}
