const path   = require('path');
const Koa    = require('koa');
const app    = new Koa();
const serve  = require('koa-static');


app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// 静态文件服务目录
const staticDir = path.join(__dirname, '../build');
app.use(serve(staticDir, {
  maxage: 360000,
}));

const port = 9001;
app.listen(port);
console.log(`静态文件服务已启动: \nhttp://localhost:${port}`);
