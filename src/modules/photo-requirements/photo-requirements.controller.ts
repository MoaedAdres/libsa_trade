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
} from '@nestjs/common';
import { PhotoRequirementsService } from './photo-requirements.service';
import { CreatePhotoRequirementDto } from './dto/create-photo-requirement.dto';
import { UpdatePhotoRequirementDto } from './dto/update-photo-requirement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('photo-requirements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PhotoRequirementsController {
  constructor(
    private readonly photoRequirementsService: PhotoRequirementsService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createPhotoRequirementDto: CreatePhotoRequirementDto) {
    return this.photoRequirementsService.create(createPhotoRequirementDto);
  }

  @Get()
  findAll() {
    return this.photoRequirementsService.findAll();
  }

  @Get('stage/:stage')
  findByStage(@Param('stage') stage: string) {
    return this.photoRequirementsService.findByStage(stage);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.photoRequirementsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoRequirementDto: UpdatePhotoRequirementDto,
  ) {
    return this.photoRequirementsService.update(id, updatePhotoRequirementDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.photoRequirementsService.remove(id);
  }
}
