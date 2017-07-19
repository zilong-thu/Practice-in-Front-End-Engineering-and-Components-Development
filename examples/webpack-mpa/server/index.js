const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

const PORT = 3000;
app.listen(PORT);
console.log('Server running at http://localhost:3000');
