import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserPhonesService } from './user-phones.service';
import { CreateUserPhoneDto } from './dto/create-user-phone.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('user-phones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserPhonesController {
  constructor(private readonly userPhonesService: UserPhonesService) {}

  @Post()
  create(@Body() createUserPhoneDto: CreateUserPhoneDto) {
    return this.userPhonesService.create(createUserPhoneDto);
  }

  @Get()
  findAll(@Query('userId') userId?: number) {
    if (userId) {
      return this.userPhonesService.findByUser(userId);
    }
    return this.userPhonesService.findAll();
  }

  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.userPhonesService.findByPhone(phone);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userPhonesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserPhoneDto: UpdateUserPhoneDto,
  ) {
    return this.userPhonesService.update(id, updateUserPhoneDto);
  }

  @Patch(':id/verify')
  verifyPhone(@Param('id', ParseIntPipe) id: number) {
    return this.userPhonesService.verifyPhone(id);
  }

  @Post(':id/send-verification')
  sendVerification(@Param('id', ParseIntPipe) id: number) {
    return this.userPhonesService.sendVerification(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userPhonesService.remove(id);
  }
}
