import {Controller, Get, Logger} from '@nestjs/common';
import {AppService} from './app.service';
import {CommonUtil} from "./common.util";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getHello(): Promise<string> {
    this.logger.log('hello');
    await CommonUtil.sleep(15000);
    return this.appService.getHello();
  }
}
