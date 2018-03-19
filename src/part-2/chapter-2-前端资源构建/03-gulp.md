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

## 关于“流”


## 参考资料

1. Gulp 官网. https://gulpjs.com/
2. GNU Make. https://www.gnu.org/software/make/
