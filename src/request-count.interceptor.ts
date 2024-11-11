import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler, Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable()
export class RequestCountInterceptor implements NestInterceptor {

  private readonly logger = new Logger(RequestCountInterceptor.name);
  constructor(private readonly appService: AppService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.appService.increaseRequestCount();
    // this.logger.log("test 111")
    return next.handle().pipe(
      // tap(() => this.logger.log("test 222")),
      tap(() => this.appService.decreaseRequestCount()),
    );
  }
}
