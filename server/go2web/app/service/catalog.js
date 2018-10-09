'use strict';

// const Service = require('egg').Service;
const Service = require('../core/MYService');

class CatalogService extends Service {

  // 根据upId查询catalog
  async query(upId) {
    const { app } = this;
    const catalogs = await app.mysql.select('catalog', {
      where: { upId },
      orders: [[ 'index', 'asc' ]],
    });
    return catalogs;
  }

  // 根据id查询catalog
  async get(id) {
    const { app } = this;
    const catalog = await app.mysql.get('catalog', { id });

    if (catalog == null) this.ERROR(500, '没有数据');
    return catalog;
  }

  // 为index写的调用
  async queryIndex() {
    const { app } = this;
    const catalogs = await app.mysql.select('catalog', {
      where: { upId: 0 },
      orders: [[ 'index', 'asc' ]],
    });

    const allCatalog = await Promise.all(catalogs.map(async value => {
      const _tmp = await app.mysql.select('catalog', {
        where: { upId: value.id },
        orders: [[ 'index', 'asc' ]],
      });
      value.subCatalogs = _tmp;
      return value;
    }));
    return allCatalog;
  }

  // 根据user查
  async queryUser(userId) {
    const { ctx, app } = this;
    let catalogs = await app.mysql.select('catalog', {
      where: { upId: 0, userId },
      orders: [[ 'index', 'asc' ]],
    });
    catalogs = await Promise.all(catalogs.map(async value => {
      value.subCatalogs = await ctx.service.catalog.query(value.id);
      value.subCatalogs = value.subCatalogs.map(value => {
        return {
          id: value.id,
          name: value.name,
          index: value.index,
        };
      });
      return {
        id: value.id,
        name: value.name,
        index: value.index,
        subCatalogs: value.subCatalogs,
      };
    }));
    return catalogs;
  }
}

module.exports = CatalogService;
