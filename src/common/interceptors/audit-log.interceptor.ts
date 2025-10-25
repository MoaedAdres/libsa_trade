import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../../modules/audit/audit.service';
import { AUDIT_LOG_KEY } from '../decorators/audit-log.decorator';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private auditService: AuditService,
    private reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditData = this.reflector.get(AUDIT_LOG_KEY, context.getHandler());
    
    if (!auditData) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (result) => {
        try {
          await this.auditService.log({
            actorId: user.id,
            action: auditData.action,
            targetType: auditData.targetType || context.getClass().name,
            targetId: result?.id,
            newValues: result,
            ipAddress: request.ip,
            userAgent: request.get('User-Agent'),
            sessionId: request.sessionID,
          });
        } catch (error) {
          // Don't fail the request if audit logging fails
          console.error('Audit logging failed:', error);
        }
      }),
    );
  }
}
