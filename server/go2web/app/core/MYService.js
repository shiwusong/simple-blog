'use strict';

const Service = require('egg').Service;

class MYService extends Service {
  // 错误返回
  ERROR(code, message, errors) {
    code = code || 500;
    message = message || '系统错误，叫爸爸！';
    this.ctx.throw(200, message, {
      code,
      errors,
    });
  }
}

module.exports = MYService;
