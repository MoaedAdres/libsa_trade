import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

export interface AuditLogData {
  actorId: number;
  action: string;
  targetType: string;
  targetId?: number;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(auditData: AuditLogData): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create(auditData);
    return this.auditLogRepository.save(auditLog);
  }

  async getAuditLogs(
    targetType?: string,
    targetId?: number,
    actorId?: number,
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ logs: AuditLog[]; total: number }> {
    const queryBuilder = this.auditLogRepository.createQueryBuilder('audit_log');

    if (targetType) {
      queryBuilder.andWhere('audit_log.targetType = :targetType', { targetType });
    }

    if (targetId) {
      queryBuilder.andWhere('audit_log.targetId = :targetId', { targetId });
    }

    if (actorId) {
      queryBuilder.andWhere('audit_log.actorId = :actorId', { actorId });
    }

    const [logs, total] = await queryBuilder
      .orderBy('audit_log.createdAt', 'DESC')
      .limit(limit)
      .offset(offset)
      .getManyAndCount();

    return { logs, total };
  }

  async getAuditLogById(id: number): Promise<AuditLog> {
    return this.auditLogRepository.findOne({ where: { id } });
  }
}
