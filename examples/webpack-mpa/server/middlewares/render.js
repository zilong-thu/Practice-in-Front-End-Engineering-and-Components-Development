const path = require('path');
const nunjucks = require('nunjucks');
const getWebpackEntryObj = require('../utils/get-entry.js');


function getPageRoutes() {
  const reactEntry = getWebpackEntryObj();
  let pageRoutes = {};
  console.log('reactEntry => ', reactEntry);

  Object.keys(reactEntry).forEach(key => {
    const _key = /pages(\/.+)\/index/.exec(key)[1];
    pageRoutes[_key] = true;
  });

  pageRoutes['/'] = true;
  return pageRoutes;
}
const pageRoutes = getPageRoutes();
console.log('pageRoutes => ', pageRoutes);

module.exports = async function (ctx, next) {
  console.log('ctx.request.url:  ', ctx.request.url);
  const tplData = {
    content: 'Hello World1',
  };

  if (pageRoutes[ctx.request.url]) {
    const compiled = nunjucks.render(path.resolve(__dirname, '../../client/index.html'), tplData);
    ctx.body = compiled;
  } else {
    ctx.body = '';
  }

  await next();
}
