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
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll(
    @Query('renterId') renterId?: number,
    @Query('listingId') listingId?: number,
  ) {
    if (renterId) {
      return this.bookingsService.findByRenter(renterId);
    }
    if (listingId) {
      return this.bookingsService.findByListing(listingId);
    }
    return this.bookingsService.findAll();
  }

  @Get('my-bookings')
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  findMyBookings(@CurrentUser() user: any) {
    return this.bookingsService.findByRenter(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.remove(id);
  }

  @Patch(':id/confirm')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  confirmBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.confirmBooking(id);
  }

  @Patch(':id/cancel')
  cancelBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body('reason') reason: string,
  ) {
    return this.bookingsService.cancelBooking(id, reason);
  }

  @Patch(':id/complete')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  completeBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.completeBooking(id);
  }

  @Patch(':id/reveal-contact')
  revealContact(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.revealContact(id);
  }
}
