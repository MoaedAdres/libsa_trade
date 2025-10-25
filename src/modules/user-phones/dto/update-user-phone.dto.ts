import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPhoneDto } from './create-user-phone.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserPhoneDto extends PartialType(CreateUserPhoneDto) {
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
