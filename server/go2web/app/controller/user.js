'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/MYController');

class UserController extends Controller {

  // 登陆
  async login() {
    const ctx = this.ctx;
    const rule = {
      loginName: 'string',
      password: 'string',
    };
    ctx.validate(rule, ctx.request.body);

    const user = await ctx.service.user.login();
    return this.SUCCESS(user);
  }

  // 注册
  async register() {
    const ctx = this.ctx;
    const rule = {
      registerName: 'string',
      password: 'string',
      name: 'string',
    };
    ctx.validate(rule, ctx.request.body);

    await ctx.service.user.register();
    return this.SUCCESS();
  }

  // 检查token
  async checkToken() {
    const ctx = this.ctx;
    const rule = { token: 'string' };
    ctx.validate(rule, ctx.request.body);

    const token = ctx.request.body.token;
    const result = await ctx.service.user.checkToken(token);
    return this.SUCCESS(result);
  }
}


module.exports = UserController;
