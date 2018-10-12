'use strict';

const md5 = require('md5');
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
// const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;

module.exports = {
  Config: {
    // 路径配置
    WWWROOT: 'http://localhost:7001',
    uploadImgPath: 'D:\\Project\\go2web\\server\\go2web\\app\\public\\uploadImg',
    uploadFilePath: 'D:\\Project\\go2web\\server\\go2web\\app\\public\\uploadFile',
    uploadQAImgPath: 'D:\\Project\\go2web\\server\\go2web\\app\\public\\uploadQAImg',

    // 常量配置
    // user authority
    USER_COMMON: 0, // 普通权限，无法编辑
    USER_EDIT: 1, // 可编辑属于自己的目录文章
    USER_SUPER: 2, // 超级管理员,应该拥有所有权限
    // file
    FILE_STATUS_COMMON: 1, // 正常
    FILE_STATUS_DEL: 0, // 删除
    FILE_TYPE_IMG: 'IMG', // 图片
    FILE_TYPE_QAIMG: 'QAIMG', // 问答区域的图片
    FILE_TYPE_FILE: 'FILE', // 普通下载附件
  },

  md5,

  // 获取文件表单参数域
  getFields: async stream => {
    const fields = stream.fields;
    fields._filename = stream.filename;
    const index = fields._filename.lastIndexOf('.');
    if (index > 0) {
      fields._suffix = fields._filename.substring(index, fields._filename.length).toLowerCase();
    } else {
      fields._suffix = '';
    }
    return fields;
  },

  // 保存文件 这里的filename是绝对路径，应该由配置上传路径+生成文件夹+文件名组成
  save: async (stream, filePath) => {
    // 生成文件名
    // filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
    // 写入路径
    // const target = path.join(this.config.baseDir, 'app/public/upload/', filename);
    const writeStream = fs.createWriteStream(filePath);
    try {
      // 写入文件
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
  },

  // 获取cookie从 request.header中
  getCookie: ctx => {
    const cookieStr = ctx.request.header.cookie;
    const kvs = cookieStr.split(';');
    const cookie = {};
    kvs.map(value => {
      const arg = value.split('=');
      cookie[arg[0].trim()] = arg[1].trim();
      return null;
    });
    return cookie;
  },

  // 获取文件大小
  getFileSize: async filePath => {
    return await new Promise((res, rej) => {
      fs.stat(filePath, (err, stats) => {
        if (err) { rej(err); }
        res(stats.size);
      });
    });
  },

  // 生成文件夹，如果不存在创建，如果存在就不操作
  mkDir: async dirUrl => {
    if (!fs.existsSync(dirUrl)) {
      try {
        fs.mkdirSync(dirUrl);
        return { code: 200, msg: '' };
      } catch (err) {
        return { code: 500, msg: '创建失败！' };
      }
    }
  },


  // 对Date的扩展，将 Date 转化为指定格式的String
  dateFormat: (date, fmt) => {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },

  mdDecoreate: html => {
    const patt1 = /<(a[\s\S]*?)>[\s\S]*?<\/a>/g;
    let r = patt1.exec(html);
    while (r) {
      let str = r[0];
      const str1 = r[1];
      str = str.replace(str1, str1 + ' target="_blank"');
      html = html.replace(r[0], str);
      r = patt1.exec(html);
    }
    return html;
  },

};
