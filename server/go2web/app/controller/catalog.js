'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/MYController');

class CatalogController extends Controller {
  async query() {
    const ctx = this.ctx;
    const { upId } = ctx.params;
    const catalogs = await ctx.service.catalog.query(upId);
    return this.SUCCESS(catalogs);
  }

  async get() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const catalog = await ctx.service.catalog.get(id);
    return this.SUCCESS(catalog);
  }

  async queryIndex() {
    const ctx = this.ctx;
    const catalogs = await ctx.service.catalog.queryIndex();
    return this.SUCCESS(catalogs);
  }

  async queryUser() {
    const ctx = this.ctx;
    // 权限验证
    const user = await ctx.service.user.userFromToken();
    const { USER_COMMON } = ctx.helper.Config;
    if (user.authority === USER_COMMON) {
      return this.ERROR(502, '您没有此权限！');
    }
    const catalogs = await ctx.service.catalog.queryUser(user.id);
    return this.SUCCESS(catalogs);
  }
}

module.exports = CatalogController;
