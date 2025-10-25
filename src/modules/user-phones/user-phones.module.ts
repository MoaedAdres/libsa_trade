import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPhonesService } from './user-phones.service';
import { UserPhonesController } from './user-phones.controller';
import { UserPhone } from './entities/user-phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPhone])],
  controllers: [UserPhonesController],
  providers: [UserPhonesService],
  exports: [UserPhonesService],
})
export class UserPhonesModule {}
