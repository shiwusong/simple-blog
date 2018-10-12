'use strict';

const Service = require('../core/MYService');
const hljs = require('highlight.js');
const marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: code => {
    return hljs.highlightAuto(code).value;
  },
});

class MdService extends Service {
  async getTmd(user) {
    const { app } = this;
    const tmd = await app.mysql.get('tmd', { userId: user.id });
    if (tmd == null) return '';
    return tmd.md;
  }

  async saveTmd(user, md) {
    const { app, ctx } = this;
    const tmd = await app.mysql.get('tmd', { userId: user.id });
    if (tmd == null) {
      const result = await app.mysql.insert('tmd', {
        userId: user.id,
        md,
        html: ctx.helper.mdDecorate(marked(md)),
      });
      if (result.affectedRows !== 1) this.ERROR();
      return;
    }
    tmd.md = md;
    tmd.html = ctx.helper.mdDecorate(marked(md));
    const result = await app.mysql.update('tmd', tmd);
    if (result.affectedRows !== 1) this.ERROR();
  }

  async saveMd(userId, catalogId, md, title, index) {
    const { app, ctx } = this;
    const result = await app.mysql.insert('md', {
      userId,
      catalogId,
      md,
      html: ctx.helper.mdDecorate(marked(md)),
      title,
      index,
    });
    if (result.affectedRows !== 1) this.ERROR();
  }

  async listMd(catalogId) {
    const { app } = this;
    const mds = await app.mysql.select('md', {
      where: { catalogId, status: 1 },
      columns: [ 'id', 'title' ],
      orders: [[ 'index', 'asc' ]],
    });
    return mds;
  }

  async getMd(id) {
    const { app } = this;
    const md = await app.mysql.get('md', { id });
    if (md == null) return this.ERROR(500, '没有数据');
    md.md = null;
    return md;
  }
}

module.exports = MdService;
