'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/ajax', controller.ajax.show);
  router.post('/ajax', controller.ajax.upload);

  router.get('/', controller.home.index);
};
