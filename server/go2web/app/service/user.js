'use strict';

const Service = require('../core/MYService');

class UserService extends Service {

  // 登陆
  // 登陆失败会返回{ code：500, msg: '原因' }
  // 登陆成功会返回{ code: 200, msg: '', data }
  async login() {
    const { ctx, app } = this;
    const { loginName, password } = ctx.request.body;

    const user = await app.mysql.get('user', { account: loginName });
    if (user == null) return this.ERROR(500, '账号不存在');
    if (user.password !== ctx.helper.md5(password)) return this.ERROR(500, '密码错误');
    const token = ctx.helper.md5((new Date()).getTime() + user.account);
    user.token = token;
    const result = await app.mysql.update('user', user);
    if (result.affectedRows !== 1) return this.ERROR();
    return { name: user.username, token: user.token, authority: user.authority };
  }


  // 注册
  // error { code: 500, msg: '' }
  // success { code: 200, msg: '' }
  async register() {
    const { ctx, app } = this;
    const { registerName, password, name } = ctx.request.body;
    const user = await app.mysql.get('user', { account: registerName });
    if (user != null) this.ERROR(500, '此账号已注册！');
    const result = await app.mysql.insert('user', {
      account: registerName,
      password: ctx.helper.md5(password),
      username: name,
      authority: 0,
    });
    if (result.affectedRows !== 1) this.ERROR();
  }

  // 检测token是否有效
  // error: { code: 500, msg: 'info' }
  // success: { code: 200, msg: '' ,data : { name, token } }
  async checkToken(token) {
    const { app } = this;
    const user = await app.mysql.get('user', { token });
    if (user == null) this.ERROR(501, '登陆信息有误！');
    return { token: user.token, name: user.username, authority: user.authority };
  }

  // 通过cookie获取token
  // error: { code: 501, msg: '登陆信息有误！'}
  // success: { code: 200, msg: '', data:  user  }
  async userFromToken() {
    const { ctx, app } = this;
    ctx.request.header.end = 1;
    const token = ctx.helper.getCookie(ctx).token;
    if (token == null) this.ERROR(501, '登陆信息有误！');
    const user = await app.mysql.get('user', { token });
    if (user == null) this.ERROR(501, '登陆信息有误！');
    return user;
  }

}

module.exports = UserService;
