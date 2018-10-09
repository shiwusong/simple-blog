'use strict';

const Controller = require('../core/MYController');

class CommentController extends Controller {

  // 提交问题
  async submitQ() {
    const ctx = this.ctx;
    // 登陆验证
    const user = await ctx.service.user.userFromToken();
    const rule = {
      mdid: 'int',
      title: 'string',
      mode: 'string',
      info: { type: 'string', required: false },
      code: { type: 'string', required: false },
      imgPath: { type: 'string', required: false },
    };
    ctx.validate(rule, ctx.request.body);
    const { mdid, title, mode, info, code, imgPath } = this.ctx.request.body;
    const option = { mdid, title, info, code, imgPath, user, mode };
    await ctx.service.comment.submitQ(option);
    return this.SUCCESS();
  }

  // 查询问题
  async listQA() {
    const ctx = this.ctx;
    const rule = {
      mdId: 'int',
    };
    ctx.params.mdId = parseInt(ctx.params.mdId);
    ctx.validate(rule, ctx.params);
    const { mdId } = ctx.params;
    const qas = await ctx.service.comment.listQA(mdId);
    return this.SUCCESS(qas);
  }

  // 提交答案
  async submitA() {
    const ctx = this.ctx;
    const user = await ctx.service.user.userFromToken();
    const rule = {
      commentQId: 'int',
      mode: 'string',
      info: { type: 'string', required: false },
      code: { type: 'string', required: false },
    };
    ctx.validate(rule, ctx.request.body);
    const { mode, info, code, commentQId } = this.ctx.request.body;
    const option = { mode, info, code, user, commentQId };
    await ctx.service.comment.submitA(option);
    return this.SUCCESS();
  }

}
module.exports = CommentController;
