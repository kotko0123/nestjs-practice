import {BeforeApplicationShutdown, Injectable, Logger} from '@nestjs/common';

@Injectable()
export class AppService implements BeforeApplicationShutdown {

  private readonly logger = new Logger(AppService.name);
  private activeRequests = 0;

  increaseRequestCount() {
    this.activeRequests++;
  }

  decreaseRequestCount() {
    this.activeRequests--;
  }

  async beforeApplicationShutdown(signal?: string): Promise<any> {
    this.logger.log(`Received shutdown signal: ${signal}`);
    // 모든 요청이 완료될 때까지 대기
    while (this.activeRequests > 0) {
      this.logger.log(`대기 중인 요청: ${this.activeRequests}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초마다 확인
    }
    this.logger.log('모든 요청이 완료되었습니다.');
  }

  getHello(): string {
    this.logger.log('world');
    return 'Hello World!';
  }
}
