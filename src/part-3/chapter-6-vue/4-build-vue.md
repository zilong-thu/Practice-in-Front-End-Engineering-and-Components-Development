# Vue 构建示例

我们来看一下，使用 webpack、vue 等工具进行构建的话，我们的项目目录结构该如何设计，webpack 该如何配置。

对于大型的生产环境项目，Vue 官方给出了 `vue-cli`<sup>[1]</sup> 这样的脚手架工具来初始化项目结构，开发者既可以直接使用，也可以在此基础上再更改。我们在这里暂且不使用 `vue-cli`，而是基于 `webpack`、`vue-loader` 等设计一个简单的构建流程。

### 目录结构设计

项目的目录结构如下设计。我们以 `src/pages` 目录下的每个 `index.vue` 文件作为页面的入口，也是 webpack 打包的入口（entry）。构建后将 `src/pages` 的文件放到 `build` 目录下（即提升了一层目录）。

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
│   ├── components            # 放置一些公共组件，不会作为 webpack 的打包入口
│   ├── pages                 # 页面目录
│   │   ├── explore
│   │   │   └── index.vue     # 页面的单文件组件
│   │   └── home
│   │       └── index.vue
│   └── utils                 # 放置一些常用的工具类 JS 文件
└── webpack.config.js         # webpack 配置文件
```

### 依赖的包

```json
{
  "name": "vue-build",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
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

下面是一个自定义的用于 Vue 项目构建的 `webpack.config.js` 文件。

```javascript
const fs                = require('fs');
const path              = require('path');
const VueLoaderPlugin   = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf            = require('rimraf');
const mkdirp            = require('mkdirp');

const config = {
  mode: 'development',
  entry: {
    home: './src/pages/home/index.vue',
    explore: './src/pages/home/index.vue',
  },
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
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    // HMR shows correct file names in console on update.
    new webpack.NamedModulesPlugin(),
  ],
}

const entry = config.entry;
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
    console.log('构建目标目录已删除');
  }
} catch(e) {}
mkdirp(CACHE_DIR_NAME);

// html 模板文件路径
const htmlTemplate = path.resolve('./src/index.html');

pageEntryNames.forEach(name => {
  let content = vueTemplateFile.replace('${path}', path.resolve(entry[name]));
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


## 参考资料

1. [vue-cli | github](https://github.com/vuejs/vue-cli)
