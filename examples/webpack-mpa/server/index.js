const Koa = require('koa');
const app = new Koa();
const render = require('./middlewares/render.js');

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
  console.log(`${ctx.method}  ${ctx.url}    ${ms}ms`);
});

app.use(render);

const PORT = 3000;
app.listen(PORT);
console.log('Server running at http://localhost:3000');
