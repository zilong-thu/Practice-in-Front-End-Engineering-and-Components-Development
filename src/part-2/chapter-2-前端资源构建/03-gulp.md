# Gulp.js

<img src="./images/gulp-2x.png" style="width: 60px;" class="fl">

Gulp.js<sup>[1]</sup> 是基于流对文件进行自动化处理的任务管理工具，它对外提供一个极简的 API 集合，简洁易用。Gulp.js 是 Grunt.js 的继任者。Grunt.js 因为在文件处理流程中使用文件保存中间结果而比较缓慢。Gulp.js 在最终输出结果之前的处理结果则全部在内存中，因而具备更好的性能。

Gulp.js 的定位是**任务执行器（task runner）**，有点类似于 GNU Make<sup>[2]</sup>。

## 基本使用

在项目的根目录下安装局部的 `gulp` 并且创建其配置文件 `gulpfile.js`：

```
$ npm install gulp --save-dev
$ touch gulpfile.js
```

运行构建任务时，`node_modules/.bin/gulp` 会默认寻找与 `node_modules` 平级的 `gulpfile.js` 文件，从中读取任务定义然后执行。此外，还可以通过 `--gulpfile` 指定某个特定的 JavaScript 文件作为 gulp 任务的配置文件。例如：

```
$ gulp --gulpfile ./gulpfile-v1.js
```

前端资源的构建方式决定了开发时方方面面的体验：源码结构是否清晰，资源（图片、CSS、JS、音视频等）是否总能通过最短路径查找到，源码变动是否能够自动化刷新到浏览器中，等等。

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

即可启动该服务器。

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

### 版本v2：添加压缩

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

## 参考资料

1. Gulp 官网. https://gulpjs.com/
2. GNU Make. https://www.gnu.org/software/make/
