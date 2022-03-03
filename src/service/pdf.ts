import { Provide, App, Body } from '@midwayjs/decorator';
import { Application } from 'egg';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { PromiseFactory } from '../utils/PromiseFactory';

const dirCache = {};
const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

@Provide()
export class PDFService {
  @App()
  app: Application;
  generate(@Body() url = '', @Body() destination = ''): Promise<string> {
    let browser = null;
    return PromiseFactory.create(
      async (resolve, reject) => {
        // 校验
        if (!url) return reject('请选择网址！');
        if (!destination) return reject('请选择保存地址！');
        if (!destination.endsWith('.pdf'))
          return reject('保存地址以.pdf结尾！');
        // 获取地址，判断路径，批量创建
        destination = destination.startsWith('/')
          ? destination
          : `/${destination}`;
        const publicPath = (this.app.getConfig('root') as string) + '/public';
        const saveFullPath = `${publicPath}${destination}`.replace(/\\/g, '/');
        const relativePaths = `public${destination}`.split('/').slice(0, -1);
        let currentPath = relativePaths[0];
        for (let i = 1; i <= relativePaths.length; i++) {
          if (!dirCache[currentPath] && !fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
          }
          dirCache[currentPath] = true;
          currentPath += `/${relativePaths[i]}`;
        }
        // 打开浏览器，生成pdf，然后关闭浏览器，返回
        browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        await sleep(10000);
        await page.pdf({
          path: saveFullPath,
          format: 'a4',
        });
        return resolve(destination);
      },
      async () => {
        // 无论发生什么，在最后都把browser关闭，清除引用
        browser && (await browser.close()) && (browser = null);
      }
    );
  }
}
