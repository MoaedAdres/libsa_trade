import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Payout } from './entities/payout.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePayoutDto } from './dto/create-payout.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Payout)
    private payoutRepository: Repository<Payout>,
  ) {}

  // Payment methods
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment) as Promise<Payment>;
  }

  async findAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: ['booking', 'processedByUser'],
    });
  }

  async findPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['booking', 'processedByUser'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async findPaymentsByBooking(bookingId: number): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { bookingId },
      relations: ['booking', 'processedByUser'],
    });
  }

  async updatePayment(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.findPaymentById(id);
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async removePayment(id: number): Promise<void> {
    const payment = await this.findPaymentById(id);
    await this.paymentRepository.remove(payment);
  }

  async processPayment(id: number, processedBy: number): Promise<Payment> {
    const payment = await this.findPaymentById(id);
    payment.status = 'completed' as any;
    payment.processedBy = processedBy;
    payment.completedAt = new Date();
    return this.paymentRepository.save(payment);
  }

  // Payout methods
  async createPayout(createPayoutDto: CreatePayoutDto): Promise<Payout> {
    const payout = this.payoutRepository.create(createPayoutDto);
    return this.payoutRepository.save(payout) as Promise<Payout>;
  }

  async findAllPayouts(): Promise<Payout[]> {
    return this.payoutRepository.find({
      relations: ['supplier', 'processedByUser'],
    });
  }

  async findPayoutById(id: number): Promise<Payout> {
    const payout = await this.payoutRepository.findOne({
      where: { id },
      relations: ['supplier', 'processedByUser'],
    });

    if (!payout) {
      throw new NotFoundException(`Payout with ID ${id} not found`);
    }

    return payout;
  }

  async findPayoutsBySupplier(supplierId: number): Promise<Payout[]> {
    return this.payoutRepository.find({
      where: { supplierId },
      relations: ['supplier', 'processedByUser'],
    });
  }

  async processPayout(id: number, processedBy: number): Promise<Payout> {
    const payout = await this.findPayoutById(id);
    payout.status = 'completed' as any;
    payout.processedBy = processedBy;
    payout.completedAt = new Date();
    return this.payoutRepository.save(payout);
  }
}
