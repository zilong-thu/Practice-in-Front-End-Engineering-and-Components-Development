# 前端资源构建系统演进示例

前端资源的构建方式决定了开发时方方面面的体验：源码结构是否清晰，资源（图片、CSS、JS、音视频等）是否总能通过最短路径查找到，源码变动是否能够自动化刷新到浏览器中，等等。

### 准备工作：目录与服务

假设我们的根目录下的第一级文件结构这样设计：

```
.
├── build
├── client
├── gulpfile.js
├── package.json
└── server
    └── index.js
```

其中，`./server/index.js` 定义了一个极简的静态文件服务器，将 `./build` 目录作为静态文件资源服务的根目录：

```javascript
const path   = require('path');
const Koa    = require('koa');
const app    = new Koa();
const serve  = require('koa-static');

// 静态文件服务目录
const staticDir = path.join(__dirname, '../build');
app.use(serve(staticDir));
app.listen(9001);
```

运行

```
$ node ./server/index.js
```

即可启动该服务器。此时，浏览器中访问 `http://localhost:9001/home`，服务器就会响应 `./build/home/index.html` 这个文件。

`./client` 目录则用于存放我们所有的客户端源码。我们希望构建后，`build`目录内部的结构基本与源码目录下的结构保持一致，如下图所示：

<img src="./images/dir-01-client-to-build.png" style="width: 90%;">

下面我们使用 Gulp.js，由浅入深，一步一步地搭建起我们的开发构建流程。

### 极简版本v1：复制

```javascript
/**
 * gulpfile-v1.js
 */
const gulp = require('gulp');
const copydir = require('copy-dir');

const BUILD_ROOT = './build/';
const SRC_ROOT = './client';

gulp.task('build-client', function() {
  copydir.sync(SRC_ROOT, BUILD_ROOT);
});

// ** 是指所有深度的文件夹
gulp.task('watch', () => {
  gulp.watch(['./client/**/*'], ['build-client']);
});

gulp.task('default', ['build-client', 'watch']);
```

在上面这个 `gulpfile-v1.js` 配置文件里，我们定义了一个名为 `build-client` 的任务，和名为 `watch` 的任务，前者只是简单粗暴地将 `./client` 目录下的所有文件原封不动地复制到了 `./build` 目录下，后者则监听 `./client` 目录下所有文件的变动，在变动发生时执行复制任务。

### 版本v2：压缩文件

版本 v1 仅仅是复制源码到静态文件目录，代码没有进行任何压缩处理，直接响应给浏览器，会增加不必要的网络传输。我们可以针对不同类型的文件，分别进行压缩处理。

关于 glob。。。

```javascript
const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const fse  = require('fs-extra');
const copydir  = require('copy-dir');
const cleanCSS = require('gulp-clean-css');
const uglify   = require('gulp-uglify');

const BUILD_ROOT = './build/';
const SRC_ROOT = './client';

gulp.task('css', () => {
  return gulp.src(`${SRC_ROOT}/**/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(BUILD_ROOT));
});

gulp.task('js', () => {
  return gulp.src(`${SRC_ROOT}/**/*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_ROOT));
});

gulp.task('copy', () => {
  const files = glob.sync(`${SRC_ROOT}/**/*.!(js|css)`);
  files.forEach(item => {
    fse.copySync(item, item.replace(SRC_ROOT, BUILD_ROOT));
  });
});

gulp.task('watch', () => {
  gulp.watch(['./client/**/*.css'], ['css']);
  gulp.watch(['./client/**/*.js'], ['js']);
  gulp.watch(['./client/**/*.!(js|css)'], ['copy']);
});

gulp.task('default', ['css', 'js', 'copy', 'watch']);
```

### 版本v3：JavaScript 模块化

进行了压缩，代码文件的网络传输体积变小，看上去的确很美好。然而，源码总不能只在一个文件里面写，我们还要考虑代码复用的情况（不光是 JavaScript，还有 CSS、HTML 片段）。此时，有必要引入 JavaScript 模块系统、CSS 编译系统以及 HTML 模板。在版本 v3 里，我们实现 JavaScript 模块化开发及构建方案。

鉴于 ECMAScript 6 Modules（下面简称 ESM）早已标准化，我们不妨以 ESM 模块系统来管理浏览器端的 JavaScript 代码，然后使用 webpack 对客户端 JS 进行依赖分析、打包、压缩等工作。

首先，我们需要一种机制来寻找各个 JS 入口文件。简单起见，我们约定每个页面目录下的 `index.js` 文件是该页面的入口文件，那么我们可以这样声明一个函数：

```javascript
// 找到所有的 index.js 文件
function findAllJSEntryFiles() {
  const files = glob
    .sync('./client/**/index.js')
    .map(item => ({
      path: item,
      name: item.replace('./client/', '').replace('.js', ''),
    }));

  const pagesJsEntry = {};
  files.forEach(item => {
    // pagesJsEntry 形如 {
    //   'home/index': './client/home/index.js'
    // }
    pagesJsEntry[item.name] = item.path;
  });

  return pagesJsEntry;
}
```

借助函数 `findAllJSEntryFiles()`，我们在 `gulpfile-v2.js` 里定义的 `js` 任务可以更改为使用 webpack 进行构建：

```javascript
gulp.task('js', () => {
  const conf = {
    entry: findAllJSEntryFiles(),
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    }
  };

  webpack(conf, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log('-- error --');
      return;
    }

    // Done processing
    console.log('\nwebpack 构建完成 ✔\n');
  });
});
```

通过这样的配置，我们就可以方便地使用 ESM 了。以 `./client/home` 页面为例，通过下面的一个小功能，测试一下打包的结果是否正确。目录结构与 HTML 代码：

<img src="./images/dir-02-home.png" style="width: 200px; float: left; margin-right: 30px;">

```html
<!-- ./client/home/index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Home Page</title>
</head>
<body>
  <p>测试 ESM 组织源码及使用 webpack 打包 JS 代码</p>
  <pre id="output"></pre>
  <script src="/home/index.js"></script>
</body>
</html>
```

`./home/index.js` 里，引入常用的 `underscore`，调用 `_.pick` 方法从一个对象里提取部分键值对，然后把新的对象插入到文档里：

```javascript
import _ from 'underscore';

// 调用 underscore 的 pick 方法
var pickedData = _.pick({name: 'moe', age: 50, userid: 'moe1'}, ['name', 'age']);

document.querySelector('#output').innerHTML = '=> ' + JSON.stringify(pickedData);
```

如果构建的结果正确，那么我们可以在浏览器里看到这样的结果：

<img src="./images/result-home-01.png" style="width: 440px; border: 1px solid #eee; border-radius: 4px;">

### 版本v4：CSS 预处理

CSS 也有多种方案做到模块化、代码复用。

### 版本v5：HTML 模板


### 版本v6：哈希
