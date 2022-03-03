import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import path = require('path');

const root = path.resolve();

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642397206677_2549';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // 项目根地址
  config.root = root;

  // 静态化访问前缀,如：`http://127.0.0.1:7001/public/images/logo.png`
  config.static = {
    dir: [path.join(root, 'public')], // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
