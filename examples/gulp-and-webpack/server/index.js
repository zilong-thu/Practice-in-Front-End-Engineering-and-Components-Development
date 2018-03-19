const path   = require('path');
const Koa    = require('koa');
const app    = new Koa();
const serve  = require('koa-static');

// static file server
const staticDir = path.join(__dirname, '../client');
console.log('static file dir: ', staticDir);
app.use(serve(staticDir));


const port = 9001;
app.listen(port);
console.log(`静态文件服务已启动: \nhttp://localhost:${port}`);
