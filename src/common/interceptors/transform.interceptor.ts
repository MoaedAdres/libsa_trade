import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Transform snake_case to camelCase in response
        if (data && typeof data === 'object') {
          return this.transformKeys(data);
        }
        return data;
      }),
    );
  }

  private transformKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.transformKeys(item));
    }

    if (obj !== null && typeof obj === 'object') {
      const transformed: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
          transformed[camelKey] = this.transformKeys(obj[key]);
        }
      }
      return transformed;
    }

    return obj;
  }
}
