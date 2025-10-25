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
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('listings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @Roles(UserRole.SUPPLIER, UserRole.ADMIN)
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Get()
  findAll(
    @Query('itemId') itemId?: number,
    @Query('status') status?: string,
    @Query('featured') featured?: boolean,
  ) {
    if (itemId) {
      return this.listingsService.findByItem(itemId);
    }
    if (status) {
      return this.listingsService.findByAvailabilityStatus(status);
    }
    if (featured) {
      return this.listingsService.findFeatured();
    }
    return this.listingsService.findAll();
  }

  @Get('featured')
  findFeatured() {
    return this.listingsService.findFeatured();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPPLIER, UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(id, updateListingDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPPLIER, UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.remove(id);
  }

  @Patch(':id/view')
  incrementViews(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.incrementViews(id);
  }

  @Patch(':id/featured')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  setFeatured(
    @Param('id', ParseIntPipe) id: number,
    @Body('isFeatured') isFeatured: boolean,
  ) {
    return this.listingsService.setFeatured(id, isFeatured);
  }

  @Patch(':id/availability')
  @Roles(UserRole.SUPPLIER, UserRole.ADMIN)
  updateAvailabilityStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.listingsService.updateAvailabilityStatus(id, status);
  }
}
