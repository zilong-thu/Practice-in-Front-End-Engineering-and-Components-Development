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

运行构建任务时，`node_modules/.bin/gulp` 会寻找与 `node_modules` 平级的 `gulpfile.js` 文件，从中读取任务定义然后执行。

前端资源的构建方式决定了开发时方方面面的体验：源码结构是否清晰，资源（图片、CSS、JS、音视频等）是否总能通过最短路径查找到，源码变动是否能够自动化刷新到浏览器中，等等。

假设我们的目录结构这样设计：

```

```


## 参考资料

1. Gulp 官网. https://gulpjs.com/
2. GNU Make. https://www.gnu.org/software/make/
