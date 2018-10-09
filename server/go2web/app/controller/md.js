'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/MYController');

class MdController extends Controller {
  async getTmd() {
    const ctx = this.ctx;

    // 权限验证
    const user = await ctx.service.user.userFromToken();
    const { USER_COMMON } = ctx.helper.Config;
    if (user.authority === USER_COMMON) {
      return this.ERROR(502, '您没有此权限！');
    }

    const md = await ctx.service.md.getTmd(user);
    return this.SUCCESS({ md });
  }

  async saveTmd() {
    const ctx = this.ctx;
    const rule = {
      md: 'string',
    };
    ctx.validate(rule, ctx.request.body);
    // 权限验证
    const user = await ctx.service.user.userFromToken();
    const { USER_COMMON } = ctx.helper.Config;
    if (user.authority === USER_COMMON) {
      return this.ERROR(502, '您没有此权限！');
    }

    const { md } = ctx.request.body;
    await ctx.service.md.saveTmd(user, md);
    return this.SUCCESS();
  }

  async saveMd() {
    const ctx = this.ctx;
    const rule = {
      catalogId: 'int',
      title: 'string',
      md: 'string',
    };
    ctx.validate(rule, ctx.request.body);
    // 权限验证
    const user = await ctx.service.user.userFromToken();
    const { USER_COMMON } = ctx.helper.Config;
    if (user.authority === USER_COMMON) {
      return this.ERROR(502, '您没有此权限！');
    }

    const { catalogId, md, title, index } = ctx.request.body;
    await ctx.service.md.saveMd(user.id, catalogId, md, title, index);
    return this.SUCCESS();
  }

  // 文章页左侧栏的数据填充
  async listMd() {
    const ctx = this.ctx;
    const rule = {
      catalogId: 'int',
    };
    ctx.params.catalogId = parseInt(ctx.params.catalogId);
    ctx.validate(rule, ctx.params);

    const { catalogId } = ctx.params;
    const curCatalog = await ctx.service.catalog.get(catalogId);
    const upCatalog = await ctx.service.catalog.get(curCatalog.upId);
    const mds = await ctx.service.md.listMd(catalogId);
    return this.SUCCESS({
      upCatalog, curCatalog, mds,
    });
  }

  // 获取单个md
  async getMd() {
    const ctx = this.ctx;
    const rule = {
      id: 'int',
    };
    ctx.params.id = parseInt(ctx.params.id);
    ctx.validate(rule, ctx.params);

    const { id } = ctx.params;
    const md = await ctx.service.md.getMd(id);
    return this.SUCCESS(md);
  }
}

module.exports = MdController;
