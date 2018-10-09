'use strict';

const Controller = require('egg').Controller;

class MYController extends Controller {

  // 成功函数
  SUCCESS(data, code, message) {
    // const res = Object.assign({ code: 200, msg: '', data: {} }, { code, msg, data });
    const res = { data, code: 200, message: 'OK' };
    if (code != null) res.code = code;
    if (message != null) res.message = message;
    this.ctx.body = res;
  }

  // 失败
  ERROR(code, message, data) {
    const res = { data, code: 500, message: '系统出错了，叫爸爸！' };
    if (code != null) res.code = code;
    if (message != null) res.message = message;
    this.ctx.body = res;
  }

}

module.exports = MYController;
