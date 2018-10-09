'use strict';

module.exports = (app, prefix) => {
  const { router, controller } = app;
  // 登陆
  router.post(`/${prefix}/login`, controller.user.login);
  // 注册
  router.post(`/${prefix}/register`, controller.user.register);
  // 检查token
  router.post(`/${prefix}/checkToken`, controller.user.checkToken);

  // router.post(`/${prefix}/login`, controller.user.login);

};
