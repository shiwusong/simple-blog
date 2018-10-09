'use strict';

const Service = require('../core/MYService');

class FileService extends Service {

  // 上传文件
  async upload(user, type) {
    const { ctx, app } = this;
    const { FILE_TYPE_IMG, FILE_TYPE_FILE, FILE_TYPE_QAIMG, uploadImgPath, uploadQAImgPath, uploadFilePath, FILE_STATUS_COMMON, WWWROOT } = ctx.helper.Config;
    const stream = await ctx.getFileStream();

    // 生成文件夹(如果有就不会生成)
    let dirName = '';
    // const curTime = new Date();
    // dirName = curTime.getFullYear() + '' + (curTime.getMonth() + 1); // 年月，每个月一个文件夹
    dirName = ctx.helper.dateFormat(new Date(), 'yyyyMM');
    // 生成文件名
    let fileName = '';
    // 文件绝对路径
    let filePath = '';
    // 判断文件类型
    if (type === FILE_TYPE_IMG) {
      await ctx.helper.mkDir(`${uploadImgPath}\\${dirName}`);
      fileName = ctx.helper.dateFormat(new Date(), 'yyyyMMdd') + Math.floor((Math.random() + 1) * 1000) + (await ctx.helper.getFields(stream))._suffix;
      filePath = `${uploadImgPath}\\${dirName}\\${fileName}`;
    } else if (type === FILE_TYPE_FILE) {
      await ctx.helper.mkDir(`${uploadFilePath}\\${dirName}`);
      fileName = (await ctx.helper.getFields(stream))._filename;
      filePath = `${uploadFilePath}\\${dirName}\\${fileName}`;
    } else if (type === FILE_TYPE_QAIMG) {
      await ctx.helper.mkDir(`${uploadQAImgPath}\\${dirName}`);
      fileName = (await ctx.helper.getFields(stream))._filename;
      filePath = `${uploadFilePath}\\${dirName}\\${fileName}`;
    }

    // 保存文件
    try {
      await ctx.helper.save(stream, filePath);
    } catch (err) {
      this.ERROR(500, '保存文件出错！');
    }
    const size = await ctx.helper.getFileSize(filePath);

    const file = {
      userId: user.id,
      type,
      filename: fileName,
      dirpath: dirName,
      status: FILE_STATUS_COMMON,
      size,
    };
    const result = await app.mysql.insert('file', file);
    if (result.affectedRows !== 1) this.ERROR();
    // 返回文件的uri
    let dir;
    dir = type === FILE_TYPE_FILE ? 'uploadFile' : '';
    dir = type === FILE_TYPE_IMG ? 'uploadImg' : dir;
    dir = type === FILE_TYPE_QAIMG ? 'uploadQAImg' : dir;

    return `\\public\\${dir}\\${dirName}\\${fileName}`;
  }

  // 显示文件
  async listFile(user, type) {
    const { ctx, app } = this;
    const { FILE_STATUS_COMMON, FILE_TYPE_FILE, FILE_TYPE_IMG } = ctx.helper.Config;
    let results = await app.mysql.select('file', { // 搜索 post 表
      where: { type, status: FILE_STATUS_COMMON, userId: user.id }, // WHERE 条件
      columns: [ 'id', 'filename', 'dirpath', 'size' ], // 要查询的表字段
      orders: [[ 'createTime', 'desc' ]], // 排序方式
    });
    let dirName = type === FILE_TYPE_FILE ? 'uploadFile' : '';
    dirName = type === FILE_TYPE_IMG ? 'uploadImg' : dirName;
    results = results.map(value => {
      value.url = `/public/${dirName}/${value.dirpath}/${value.filename}`;
      return value;
    });
    return results;
  }


}

module.exports = FileService;
