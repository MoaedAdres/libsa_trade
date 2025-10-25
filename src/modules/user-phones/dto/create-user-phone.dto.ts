import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserPhoneDto {
  @IsNumber()
  userId: number;

  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
