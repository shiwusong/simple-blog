'use strict';

const Controller = require('../core/MYController');

class FileController extends Controller {


  async upload() {
    const ctx = this.ctx;
    const type = ctx.params.type;
    const { FILE_TYPE_IMG, FILE_TYPE_FILE } = ctx.helper.Config;
    if (type !== FILE_TYPE_IMG && type !== FILE_TYPE_FILE) {
      return this.ERROR(500, '未知的请求');
    }
    // 权限验证
    const user = await ctx.service.user.userFromToken();
    const { USER_COMMON } = ctx.helper.Config;
    if (user.authority === USER_COMMON) {
      return this.ERROR(502, '您没有此权限！');
    }

    // 开始保存图片
    const filePath = await ctx.service.file.upload(user, type);

    return this.SUCCESS({ filePath });
  }


  async list() {
    const ctx = this.ctx;
    const type = ctx.params.type;
    const { FILE_TYPE_IMG, FILE_TYPE_FILE } = ctx.helper.Config;
    if (type !== FILE_TYPE_IMG && type !== FILE_TYPE_FILE) {
      return this.ERROR(500, '未知的请求');
    }

    // 权限验证
    const user = await ctx.service.user.userFromToken();
    const { USER_COMMON } = ctx.helper.Config;
    if (user.authority === USER_COMMON) {
      return this.ERROR(502, '您没有此权限！');
    }

    const fileList = await ctx.service.file.listFile(user, type);
    return this.SUCCESS(fileList);
  }
}

module.exports = FileController;
