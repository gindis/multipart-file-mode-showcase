'use strict';

const fs = require('mz/fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');


module.exports = class extends Controller {
  async show() {
    await this.ctx.render('page/ajax.nj');
  }

  async upload() {
    const { ctx } = this;
    const { header } = ctx.request;
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);

    let filename = `${file.filename}`;
    if (ctx.request.body.name) {
      filename = `${encodeURIComponent(ctx.request.body.name)}${path.extname(filename)}`;
    } else {
      filename = `${Math.random(10).toString(16).split('.')[1]}_${filename}`;
    }
    const targetPath = path.join(this.config.baseDir, 'app/public', filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
      ctx.logger.warn('save %s to %s', file.filepath, targetPath);
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      status: true,
      message: 'success',
      data: {
        url: `http://${header.host}/public/${filename}`,
      },
    };

    // ctx.body = { url: '/public/' + filename };
  }
};
