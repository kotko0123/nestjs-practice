import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TraceIdMiddleware} from "./trace-id.middleware";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {LoggingInterceptor} from "./logging.interceptor";
import {RequestCountInterceptor} from "./request-count.interceptor";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestCountInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TraceIdMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
