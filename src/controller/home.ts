import { Controller, Get, Inject, Logger, Provide } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

@Provide()
@Controller('/')
export class HomeController {
  @Logger('logger')
  appLogger: ILogger;

  @Inject()
  logger;

  @Get('/')
  async home() {
    this.logger.info('home by inject logger');
    return 'Hello Midwayjs!';
  }
}
