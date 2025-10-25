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
import { DisputesService } from './disputes.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { CreateDamageAssessmentDto } from './dto/create-damage-assessment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('disputes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Post()
  @Roles(UserRole.CUSTOMER, UserRole.ADMIN)
  create(@Body() createDisputeDto: CreateDisputeDto) {
    return this.disputesService.create(createDisputeDto);
  }

  @Get()
  findAll(
    @Query('bookingId') bookingId?: number,
    @Query('status') status?: string,
  ) {
    if (bookingId) {
      return this.disputesService.findByBooking(bookingId);
    }
    if (status) {
      return this.disputesService.findByStatus(status);
    }
    return this.disputesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.disputesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDisputeDto: UpdateDisputeDto,
  ) {
    return this.disputesService.update(id, updateDisputeDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.disputesService.remove(id);
  }

  @Patch(':id/assign')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  assignDispute(
    @Param('id', ParseIntPipe) id: number,
    @Body('assignedTo') assignedTo: number,
  ) {
    return this.disputesService.assignDispute(id, assignedTo);
  }

  @Patch(':id/resolve')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  resolveDispute(
    @Param('id', ParseIntPipe) id: number,
    @Body('resolutionSummary') resolutionSummary: string,
  ) {
    return this.disputesService.resolveDispute(id, resolutionSummary);
  }

  // Damage Assessment endpoints
  @Post(':id/assessments')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  createDamageAssessment(
    @Param('id', ParseIntPipe) disputeId: number,
    @Body() createDto: CreateDamageAssessmentDto,
  ) {
    return this.disputesService.createDamageAssessment({
      ...createDto,
      disputeId,
    });
  }

  @Get(':id/assessments')
  findDamageAssessments(@Param('id', ParseIntPipe) disputeId: number) {
    return this.disputesService.findDamageAssessmentsByDispute(disputeId);
  }

  @Get('assessments/:assessmentId')
  findDamageAssessmentById(
    @Param('assessmentId', ParseIntPipe) assessmentId: number,
  ) {
    return this.disputesService.findDamageAssessmentById(assessmentId);
  }
}
