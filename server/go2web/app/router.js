'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const prefix = 'go2web';
  const htmlPath = '/public/index/index.html';
  // require('./route/user')(app, prefix);
  const { router, controller } = app;

  // 重定向
  router.redirect('/', htmlPath);
  router.redirect('/index', htmlPath);
  router.redirect('/go2web', htmlPath);

  // user
  // 登陆
  router.post(`/${prefix}/login`, controller.user.login);
  // 注册
  router.post(`/${prefix}/register`, controller.user.register);
  // 检查token
  router.post(`/${prefix}/checkToken`, controller.user.checkToken);

  // catalog
  // 查询
  router.get(`/${prefix}/catalogList/index`, controller.catalog.queryIndex);
  router.get(`/${prefix}/catalogList/user`, controller.catalog.queryUser);
  router.get(`/${prefix}/catalogList/:upId`, controller.catalog.query);
  router.get(`/${prefix}/catalogGet/:id`, controller.catalog.get);

  // file
  router.post(`/${prefix}/file/upload/:type`, controller.file.upload);
  router.get(`/${prefix}/file/list/:type`, controller.file.list);

  // tmd
  router.post(`/${prefix}/tmd/save`, controller.md.saveTmd);
  router.get(`/${prefix}/tmd/get`, controller.md.getTmd);
  // md
  router.post(`/${prefix}/md/save`, controller.md.saveMd);
  router.post(`/${prefix}/md/list/:catalogId`, controller.md.listMd);
  router.post(`/${prefix}/md/get/:id`, controller.md.getMd);

  // comment
  router.post(`/${prefix}/comment/submitQ`, controller.comment.submitQ);
  router.post(`/${prefix}/comment/submitA`, controller.comment.submitA);
  router.get(`/${prefix}/comment/listQA/:mdId`, controller.comment.listQA);


};
