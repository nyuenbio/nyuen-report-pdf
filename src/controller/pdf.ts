import {
  Controller,
  Provide,
  Post,
  App,
  Body,
  Inject,
} from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { Application } from 'egg';
import { PDFService } from '../service/pdf';
import { ResponseFactory, Response } from '../utils/ResponseFactory';

@Provide()
@Controller('/pdf')
export class PDFController {
  @App()
  app: Application;

  @Inject()
  logger: ILogger; // 获取上下文日志

  @Inject()
  pdfService: PDFService;

  /**
   *
   * @param url 要打印的网址
   * @param destination 保存pdf的地址
   * @returns 返回pdf地址
   */
  @Post('/generate')
  async home(@Body() url = '', @Body() destination = '') {
    let response: Response<string>;
    await this.pdfService
      .generate(url, destination)
      .then(val => {
        this.logger.info(`pdf生成成功，目标地址：${destination}`);
        response = ResponseFactory.buildSuccess(val);
      })
      .catch((message: string) => {
        this.logger.error(
          `pdf生成失败，目标地址：${destination}，失败原因：${message}`
        );
        response = ResponseFactory.buildFail(message);
      });
    return response;
  }
}
