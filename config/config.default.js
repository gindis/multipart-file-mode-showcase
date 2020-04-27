/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587963037921_6023';

  // add your middleware config here
  config.middleware = [];

  config.view = {
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  config.multipart = {
    mode: 'file',
  };

  config.security = {
    csrf: {
      enable: true,
      ignore: [
        '/ajax',
      ],
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
