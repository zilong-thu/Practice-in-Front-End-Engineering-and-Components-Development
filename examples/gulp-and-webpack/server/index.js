const path   = require('path');
const Koa    = require('koa');
const app    = new Koa();
const serve  = require('koa-static');


// 静态文件服务目录
const staticDir = path.join(__dirname, '../build');
app.use(serve(staticDir));

const port = 9001;
app.listen(port);
console.log(`静态文件服务已启动: \nhttp://localhost:${port}`);
