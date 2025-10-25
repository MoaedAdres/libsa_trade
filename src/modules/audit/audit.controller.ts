import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  getAuditLogs(
    @Query('targetType') targetType?: string,
    @Query('targetId') targetId?: number,
    @Query('actorId') actorId?: number,
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
  ) {
    return this.auditService.getAuditLogs(
      targetType,
      targetId,
      actorId,
      limit,
      offset,
    );
  }

  @Get('logs/:id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  getAuditLogById(@Param('id', ParseIntPipe) id: number) {
    return this.auditService.getAuditLogById(id);
  }
}
