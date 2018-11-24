# Vue 项目结构与构建

我们来看一下，使用 webpack、vue 等工具进行构建的话，我们的项目目录结构该如何设计，webpack 该如何配置。

对于大型的生产环境项目，Vue 官方给出了 `vue-cli`<sup>[1]</sup> 这样的脚手架工具来初始化项目结构，开发者既可以直接使用，也可以在此基础上再更改。我们在这里暂且不使用 `vue-cli`，而是基于 `webpack`、`vue-loader` 等设计一个简单的构建流程。

## 单页面 Vue 应用

单页面应用（SPA，Single Page Application）的目录较为简单，一个打包入口，一个（或切割后的多个）输出即可。

一个简单的单页面 Vue 应用目录结构如下所示：

```
.
├── build                     # 打包后的目录
│   ├── index.{md5}.js
│   └── index.html
├── package.json
├── src
│   ├── index.vue             # 唯一的 vue 入口
│   ├── index.html            # 页面的 html 模板，被 HtmlWebpackPlugin 使用
│   ├── components            # 放置一些公共组件，不会作为 webpack 的打包入口
│   │   ├── chart.vue
│   │   └── dialog.vue
│   └── utils                 # 放置一些常用的工具类 JS 文件
│       ├── parse-ua.js
│       └── my-axios.js
└── webpack.config.js         # webpack 配置文件
```

Webpack 配置：

```javascript
const VueLoaderPlugin   = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.vue',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: [name],
    });
  ],
}
```

其中，`src/index.html` 是所有页面公共的 HTML 模板，该文件的代码内容如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

## 多页面 Vue 应用构建

多页面应用（MPA，Multi Page Application）是更为常见的情形，也稍微复杂一下，值得我们多花点章节来分析一下开发、构建等配置。

一个常见的多页面 Vue 项目的目录结构如下所示。我们约定以 `src/pages` 目录下的每个 `index.vue` 文件作为页面的入口，也是 webpack 打包的入口（entry）参考。构建后将 `src/pages` 的文件放到 `build` 目录下（即提升了一层目录）。

```
.
├── build                     # 打包后的目录
│   ├── explore
│   │   ├── index.html        # 页面 HTML 文件
│   │   └── index.{md5}.js    # 页面 JS 文件
│   └── home
│       ├── index.html
│       └── index.{md5}.js
├── package.json
├── src
│   ├── vue-template.js       # vue 模板文件
│   ├── index.html            # 每个页面的 html 模板，被 HtmlWebpackPlugin 使用
│   ├── components            # 放置一些公共组件，不会作为 webpack 的打包入口
│   │   ├── chart.vue
│   │   └── dialog.vue
│   ├── pages                 # 页面目录
│   │   ├── explore
│   │   │   └── index.vue     # 页面的单文件组件
│   │   └── home
│   │       └── index.vue
│   └── utils                 # 放置一些常用的工具类 JS 文件
│       ├── parse-ua.js
│       └── my-axios.js
└── webpack.config.js         # webpack 配置文件
```

模板文件 `src/index.html` 与单页面时的内容及使用方式一样。

`src/vue-template.js` 会在后面的配置中作为 JS 入口的模板文件，`${path}` 会被替换为 `src/pages` 目录下的每个入口的绝对路径。该文件的代码内容如下：

```javascript
import Vue from 'vue';
import App from '${path}';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
});
```

### 依赖的包

`package.json` 中与依赖的包相关的部分如下面的代码所示。在执行构建之前，需要将它们全部安装一下。

```json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack --watch"
  },
  "dependencies": {
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
    "vue": "^2.5.16"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "css-loader": "^1.0.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^3.2.0",
    "mkdirp": "^0.5.1",
    "rimraf": "^2.6.2",
    "style-loader": "^0.23.1",
    "vue-loader": "^15.4.2",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.5.16",
    "webpack": "^4.15.1",
    "webpack-cli": "^3.0.8"
  }
}
```

### Webpack 配置

下面就是我们本次自定义的用于 Vue 项目构建的 `webpack.config.js` 文件。构建配置

```javascript
const fs                = require('fs');
const path              = require('path');
const glob              = require('glob');
const VueLoaderPlugin   = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// rimraf 提供了类似 Linux 系统下的 rm 命令
const rimraf            = require('rimraf');
// mkdirp 用于创建文件目录
const mkdirp            = require('mkdirp');

// 按照约定的格式，寻找页面入口文件
const entryFiles = glob.sync('./src/pages/**/*/index.vue');
console.log('entryFiles: ', entryFiles);
const entry = {};
entryFiles.forEach(item => {
  let key = item.replace('./src/pages/', '').replace('/index.vue', '').replace('/', '.');
  entry[key] = path.resolve(item);
});

// 配置对象
const config = {
  mode: 'development',
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}

const pageEntryNames = Object.keys(entry);
let vueTemplateFile = fs.readFileSync('./src/entry-template.js').toString();

const CACHE_DIR_NAME = '.cache';
try {
  if (fs.statSync(CACHE_DIR_NAME)) {
    rimraf.sync(CACHE_DIR_NAME);
    console.log('临时目录已删除');
  }
  if (fs.statSync(config.output.path)) {
    rimraf.sync(config.output.path);
    console.log('构建结果目录已删除');
  }
} catch(e) {}
mkdirp(CACHE_DIR_NAME);

// html 模板文件路径
const htmlTemplate = path.resolve('./src/index.html');

pageEntryNames.forEach(name => {
  let content = vueTemplateFile.replace('${path}', path.resolve(config.entry[name]));
  let newEntry = path.resolve(CACHE_DIR_NAME, './', name + '.js');
  fs.writeFileSync(newEntry, content);
  const pluginItem = new HtmlWebpackPlugin({
    // 输出时，要写入的文件名
    filename: `${name}.html`,
    // 读取的模板文件
    template: htmlTemplate,
    inject: true,
    chunks: [name],
  });

  config.entry[name] = newEntry;
  config.plugins.push(pluginItem);
});

module.exports = config;
```

在项目目录下，运行 `npm run build`，即可在 `build` 目录中看到打包后的文件了。

### 开发环境下自动构建

在开发环境下，我们希望源码一经改动，即可触发构建，如此一来可以提升开发效率。这个功能可以借助 webpack 的 watch 参数来实现。在本节一开始给出的 `package.json` 里定义了一个命令： `"dev": "webpack --watch"`。那么运行 `npm run dev`，即可启动构建并且监听当前目录下的所有文件变动。

## 参考资料

1. [vue-cli | github](https://github.com/vuejs/vue-cli)
