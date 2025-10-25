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
import { DamageAssessmentsService } from './damage-assessments.service';
import { CreateDamageAssessmentDto } from './dto/create-damage-assessment.dto';
import { UpdateDamageAssessmentDto } from './dto/update-damage-assessment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('damage-assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DamageAssessmentsController {
  constructor(
    private readonly damageAssessmentsService: DamageAssessmentsService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  create(@Body() createDamageAssessmentDto: CreateDamageAssessmentDto) {
    return this.damageAssessmentsService.create(createDamageAssessmentDto);
  }

  @Get()
  findAll(
    @Query('disputeId') disputeId?: number,
    @Query('assessedBy') assessedBy?: number,
  ) {
    if (disputeId) {
      return this.damageAssessmentsService.findByDispute(disputeId);
    }
    if (assessedBy) {
      return this.damageAssessmentsService.findByAssessor(assessedBy);
    }
    return this.damageAssessmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.damageAssessmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDamageAssessmentDto: UpdateDamageAssessmentDto,
  ) {
    return this.damageAssessmentsService.update(id, updateDamageAssessmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.damageAssessmentsService.remove(id);
  }
}
