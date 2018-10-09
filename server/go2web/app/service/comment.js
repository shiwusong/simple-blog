'use strict';

const Service = require('../core/MYService');

class CommentService extends Service {

  // 提交问题
  async submitQ(option) {
    const { app } = this;
    const result = await app.mysql.insert('commentq', {
      userId: option.user.id,
      userName: option.user.username,
      mdId: option.mdid,
      info: option.info,
      code: option.code,
      codeType: option.mode,
      title: option.title,
      imgPath: option.imgPath,
    });
    if (result.affectedRows !== 1) this.ERROR();
  }

  // 提交问题
  async submitA(option) {
    const { app } = this;
    const result = await app.mysql.insert('commenta', {
      userId: option.user.id,
      userName: option.user.username,
      commentQId: option.commentQId,
      info: option.info,
      code: option.code,
      codeType: option.mode,
    });
    if (result.affectedRows !== 1) this.ERROR();
  }

  // 查询问题
  async listQA(mdId) {
    const { app } = this;
    const qList = await app.mysql.select('commentq', {
      where: { mdId },
      orders: [[ 'createTime', 'desc' ]],
    });
    const qaList = await Promise.all(qList.map(async value => {
      const aList = await app.mysql.select('commenta', {
        where: { commentQId: value.id },
        prders: [[ 'createTime', 'desc' ]],
      });
      value.answers = aList;
      return value;
    }));
    return qaList;
  }

}
module.exports = CommentService;
