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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Payment endpoints
  @Post()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  findAllPayments(@Query('bookingId') bookingId?: number) {
    if (bookingId) {
      return this.paymentsService.findPaymentsByBooking(bookingId);
    }
    return this.paymentsService.findAllPayments();
  }

  @Get(':id')
  findPaymentById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findPaymentById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  removePayment(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.removePayment(id);
  }

  @Patch(':id/process')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  processPayment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any,
  ) {
    return this.paymentsService.processPayment(id, user.id);
  }

  // Payout endpoints
  @Post('payouts')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  createPayout(@Body() createPayoutDto: CreatePayoutDto) {
    return this.paymentsService.createPayout(createPayoutDto);
  }

  @Get('payouts')
  findAllPayouts(@Query('supplierId') supplierId?: number) {
    if (supplierId) {
      return this.paymentsService.findPayoutsBySupplier(supplierId);
    }
    return this.paymentsService.findAllPayouts();
  }

  @Get('payouts/:id')
  findPayoutById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findPayoutById(id);
  }

  @Patch('payouts/:id/process')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  processPayout(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any,
  ) {
    return this.paymentsService.processPayout(id, user.id);
  }
}
