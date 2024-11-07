import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {getTraceId} from "./trace-id.middleware";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const traceId = getTraceId() || 'no-trace-id';
    this.logger.log(`Start of request with trace-id: ${traceId}`);
    return next.handle().pipe(
      tap(() => this.logger.log(`End of request with trace-id: ${traceId}`)),
    );
  }
}
