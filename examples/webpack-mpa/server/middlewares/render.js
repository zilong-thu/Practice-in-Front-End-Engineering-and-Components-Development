const path = require('path');
const nunjucks = require('nunjucks');


module.exports = async function (ctx, next) {
  const tplData = {
    content: 'Hello World1',
  };
  const compiled = nunjucks.render(path.resolve(__dirname, '../../client/index.html'), tplData);

  console.log('ctx.request.url:  ', ctx.request.url, ' | compiled: ', compiled);
  ctx.body = compiled;

  await next();
}
