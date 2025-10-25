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
import { SupplierViolationsService } from './supplier-violations.service';
import { CreateSupplierViolationDto } from './dto/create-supplier-violation.dto';
import { UpdateSupplierViolationDto } from './dto/update-supplier-violation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('supplier-violations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SupplierViolationsController {
  constructor(
    private readonly supplierViolationsService: SupplierViolationsService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  create(@Body() createSupplierViolationDto: CreateSupplierViolationDto) {
    return this.supplierViolationsService.create(createSupplierViolationDto);
  }

  @Get()
  findAll(
    @Query('supplierId') supplierId?: number,
    @Query('bookingId') bookingId?: number,
    @Query('unresolved') unresolved?: boolean,
  ) {
    if (supplierId) {
      return this.supplierViolationsService.findBySupplier(supplierId);
    }
    if (bookingId) {
      return this.supplierViolationsService.findByBooking(bookingId);
    }
    if (unresolved) {
      return this.supplierViolationsService.findUnresolved();
    }
    return this.supplierViolationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supplierViolationsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierViolationDto: UpdateSupplierViolationDto,
  ) {
    return this.supplierViolationsService.update(
      id,
      updateSupplierViolationDto,
    );
  }

  @Patch(':id/resolve')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  resolve(@Param('id', ParseIntPipe) id: number) {
    return this.supplierViolationsService.resolve(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supplierViolationsService.remove(id);
  }
}
