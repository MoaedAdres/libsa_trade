import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPhone } from './entities/user-phone.entity';
import { CreateUserPhoneDto } from './dto/create-user-phone.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';

@Injectable()
export class UserPhonesService {
  constructor(
    @InjectRepository(UserPhone)
    private userPhoneRepository: Repository<UserPhone>,
  ) {}

  async create(createUserPhoneDto: CreateUserPhoneDto): Promise<UserPhone> {
    const userPhone = this.userPhoneRepository.create(createUserPhoneDto);
    return this.userPhoneRepository.save(userPhone);
  }

  async findAll(): Promise<UserPhone[]> {
    return this.userPhoneRepository.find();
  }

  async findOne(id: number): Promise<UserPhone> {
    const userPhone = await this.userPhoneRepository.findOne({
      where: { id },
    });

    if (!userPhone) {
      throw new NotFoundException(`User phone with ID ${id} not found`);
    }

    return userPhone;
  }

  async findByUser(userId: number): Promise<UserPhone[]> {
    return this.userPhoneRepository.find({
      where: { userId },
    });
  }

  async findByPhone(phone: string): Promise<UserPhone | null> {
    return this.userPhoneRepository.findOne({
      where: { phone },
    });
  }

  async update(id: number, updateUserPhoneDto: UpdateUserPhoneDto): Promise<UserPhone> {
    const userPhone = await this.findOne(id);
    Object.assign(userPhone, updateUserPhoneDto);
    return this.userPhoneRepository.save(userPhone);
  }

  async remove(id: number): Promise<void> {
    const userPhone = await this.findOne(id);
    await this.userPhoneRepository.remove(userPhone);
  }

  async verifyPhone(id: number): Promise<UserPhone> {
    const userPhone = await this.findOne(id);
    userPhone.isVerified = true;
    userPhone.verifiedAt = new Date();
    return this.userPhoneRepository.save(userPhone);
  }

  async sendVerification(id: number): Promise<UserPhone> {
    const userPhone = await this.findOne(id);
    userPhone.verificationSentAt = new Date();
    return this.userPhoneRepository.save(userPhone);
  }
}
