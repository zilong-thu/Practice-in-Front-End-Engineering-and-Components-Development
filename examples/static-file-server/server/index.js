const path   = require('path');
const Koa    = require('koa');
const app    = new Koa();
const serve  = require('koa-static');

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// static file server
const staticDir = path.join(__dirname, '../static');
console.log('static file dir: ', staticDir);
app.use(serve(staticDir));


const port = 7001;
app.listen(port);
console.log(`server is running at: \nhttp://localhost:${port}`);
