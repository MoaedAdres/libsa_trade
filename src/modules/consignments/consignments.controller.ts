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
import { ConsignmentsService } from './consignments.service';
import { CreateConsignmentDto } from './dto/create-consignment.dto';
import { UpdateConsignmentDto } from './dto/update-consignment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('consignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConsignmentsController {
  constructor(private readonly consignmentsService: ConsignmentsService) {}

  @Post()
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  create(@Body() createConsignmentDto: CreateConsignmentDto) {
    return this.consignmentsService.create(createConsignmentDto);
  }

  @Get()
  findAll(
    @Query('ownerUserId') ownerUserId?: number,
    @Query('supplierId') supplierId?: number,
  ) {
    if (ownerUserId) {
      return this.consignmentsService.findByOwner(ownerUserId);
    }
    if (supplierId) {
      return this.consignmentsService.findBySupplier(supplierId);
    }
    return this.consignmentsService.findAll();
  }

  @Get('my-consignments')
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  findMyConsignments(@CurrentUser() user: any) {
    return this.consignmentsService.findByOwner(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consignmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConsignmentDto: UpdateConsignmentDto,
  ) {
    return this.consignmentsService.update(id, updateConsignmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consignmentsService.remove(id);
  }

  @Patch(':id/start-intake')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  startIntake(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    return this.consignmentsService.startIntake(id, user.id);
  }

  @Patch(':id/complete-intake')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  completeIntake(@Param('id', ParseIntPipe) id: number) {
    return this.consignmentsService.completeIntake(id);
  }

  @Patch(':id/return')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  returnConsignment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any,
  ) {
    return this.consignmentsService.returnConsignment(id, user.id);
  }
}
