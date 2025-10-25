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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles(UserRole.SUPPLIER, UserRole.ADMIN)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.itemsService.findByCategory(category);
    }
    return this.itemsService.findAll();
  }

  @Get('supplier/:supplierId')
  findBySupplier(@Param('supplierId', ParseIntPipe) supplierId: number) {
    return this.itemsService.findBySupplier(supplierId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPPLIER, UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPPLIER, UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(id);
  }

  @Patch(':id/approve-listing')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  approveListing(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.approveListing(id);
  }

  @Patch(':id/complete-intake')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  completeIntake(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.completeIntake(id);
  }
}
