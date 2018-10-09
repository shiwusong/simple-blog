'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536915745573_5823';

  // add your config here
  config.middleware = [];

  // mysql
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'go2web',
      timezone: '08:00',
    },
    app: true,
    agent: false,
  };

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 白名单
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    /**
    * 客户端请求如果需要保存本地凭条（cookie），则会带有特别的请求字段 withCredentials
    * 服务端需要同样开启这个字段才能响应这些请求
    * 本质上应该是在响应头里增加了这个字段: Access-Control-Allow-Credentials: true
    * 这里应该是全局设置，单独在响应头里加这个字段好像不行。应该是这个框架问题
    */
    credentials: true,
  };
  return config;
};
